import {CanvasObject} from './canvas';
import {Settings, ColorBehaviorKind} from './settings';
import {StatCategory, Stats} from './stats';
import {Color, Writeable} from './types';
import {hslToRgb, lcm, WHITE} from './util';

interface Coord {
  x: number;
  y: number;
}

export class BouncingImage implements CanvasObject {

  private position: Coord = {x: 0, y: 0};

  private direction: -1|1 = 1;
  private totalD = 0;
  private currD = 0;
  private canvasDimensions: Coord = {x: 0, y: 0};

  private readonly colorBehaviors:
      {[K in ColorBehaviorKind]: ColorBehavior} = {
        none: new NoneColorBehavior(this),
        rainbow: new RainbowColorBehavior(this),
        classic: new ClassicColorBehavior(this),
      };

  private constructor(
      readonly fileName: string,
      readonly imageData: ImageData,
      readonly settings: Settings,
      private readonly stats: Stats,
    ) {}

  tick(count: number) {
    const tickStateDelta = this.tickPosition(count);
    this.tickColor(count, tickStateDelta);
  }

  tickPercent(percent: number) {
    const count = this.totalD * percent;
    this.currD = count;
  }

  /**
   * This article helped me figure this out:
   *    http://lostmathlessons.blogspot.com/2016/03/bouncing-dvd-logo.html
   */
  private tickPosition(count: number): TickStateDelta {
    let tickStateDelta: TickStateDelta = {};
    const PIXELS_PER_MILLISECOND = this.settings.getSetting('speed');
    const MAX_TICK_COUNT = 10000;
    if (count > MAX_TICK_COUNT) {
      count = 1;
    }
    
    const prevD = this.currD;
    this.currD = prevD + (count * PIXELS_PER_MILLISECOND * this.direction);
    let hitCorner = false;
    // If we went far out of bounds, bounce back an equal amount.
    if (this.currD >= this.totalD) {
      const delta = this.currD - this.totalD;
      this.currD = this.totalD - delta;
      hitCorner = true;
    }
    if (this.currD <= 0) {
      const delta = Math.abs(this.currD);
      this.currD = delta;
      hitCorner = true;
    }
    if (hitCorner) {
      this.direction *= -1;
      this.settings.setPersistedSetting('cornersHit', ch => ch + 1);
      tickStateDelta.hitCorner = 1;
    }

    const prevUniverse = this.getUniverse(prevD);
    const universe = this.getUniverse(this.currD);
    const universeDelta = Math.abs(universe.x - prevUniverse.x) +
        Math.abs(universe.y - prevUniverse.y);
    if (!hitCorner && universeDelta) {
      this.settings.setPersistedSetting('wallsHit', wh => wh + universeDelta);
      tickStateDelta.hitWall = universeDelta;
    }

    const {x: canvasWidth, y: canvasHeight} = this.getCompensatedDimensions();
    const universeOffset = {
      x: universe.x * canvasWidth,
      y: universe.y * canvasHeight,
    };
    const delta = {
      x: this.currD - universeOffset.x,
      y: this.currD - universeOffset.y,
    };
    this.position = {
      x: universe.x % 2 === 0 ? delta.x : canvasWidth - delta.x,
      y: universe.y % 2 === 0 ? delta.y : canvasHeight - delta.y,
    };

    if (this.settings.getSetting('showTimeToCorner')) {
      const distanceToCorner = this.direction === 1 ?
          this.totalD - this.currD : this.currD;
      const pixelsPerSecond = PIXELS_PER_MILLISECOND * 1000;
      const timeToCorner = distanceToCorner / pixelsPerSecond;
      const formattedTimeToCorner = timeToCorner.toLocaleString('en-US', {
        style: 'unit',
        unit: 'second',
        maximumSignificantDigits: 3,
      });
      this.stats.quickUpdate(StatCategory.TIME_TO_CORNER,
          [['Time to corner', formattedTimeToCorner]]);
    }

    if (this.settings.getSetting('showDebugInfo')) {
      this.stats.quickUpdate(StatCategory.DEBUG, [
        ['X', this.position.x],
        ['Y', this.position.y],
        ['Universe X', universe.x],
        ['Universe Y', universe.y],
        ['Universe offset X', universeOffset.x],
        ['Universe offset Y', universeOffset.y],
        ['Delta X', delta.x],
        ['Delta Y', delta.y],
        ['D', this.currD],
        ['Total D', this.totalD],
        ['Direction', this.direction],
      ]);
    }

    return tickStateDelta;
  }

  private getCompensatedDimensions(): Coord {
    return {
      x: this.canvasDimensions.x - this.imageData.width,
      y: this.canvasDimensions.y - this.imageData.height,
    };
  }

  private getUniverse(d: number) {
    const {x, y} = this.getCompensatedDimensions();
    return {
      x: Math.floor(d / x),
      y: Math.floor(d / y),
    };
  }

  private tickColor(count: number, tickStateDelta: TickStateDelta) {
    this.colorBehaviors[this.settings.getSetting('colorBehavior')]
        .tick(count, tickStateDelta);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.imageData) {
      ctx.putImageData(this.imageData, this.position.x, this.position.y);
    }
  }

  resize(canvas: HTMLCanvasElement) {
    this.canvasDimensions = {x: canvas.width, y: canvas.height};
    const {x, y} = this.getCompensatedDimensions();
    this.totalD = lcm(y, x);
  }

  async setImage(fileName: string) {
    const writeableThis = this as Writeable<this>;
    writeableThis.fileName = fileName;
    const imageData = await loadImageData(fileName);
    writeableThis.imageData = imageData;
  }

  static async fromFile(
      fileName: string,
      settings: Settings,
      stats: Stats,
    ): Promise<BouncingImage> {
      const imageData = await loadImageData(fileName);
      return new BouncingImage(fileName, imageData, settings, stats);
    }
}

interface TickStateDelta {
  hitCorner?: number;
  hitWall?: number;
}

abstract class ColorBehavior {
  constructor(protected readonly image: BouncingImage) {}

  abstract tick(count: number, tickStateDelta: TickStateDelta): void;

  private colorEquals(a: Color, b: Color) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }

  protected setColor(color: Color) {
    const {data} = this.image.imageData;
    for (let i = 0; i < data.length; i += 4) {
      const existing: Color = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      // We know we don't need to continue since our color was the same as
      // before.
      if (this.colorEquals(existing, color)) return;
      const [r, g, b] = color;
      data[i]     = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }
}

class RainbowColorBehavior extends ColorBehavior {
  private hue = 0;

  tick(count: number, tickStateDelta: TickStateDelta) {
    const COLOR_SPEED = this.image.settings.getSetting('rainbowSpeed');
    this.tickHue((count * COLOR_SPEED) + (50 * hitDelta(tickStateDelta)));
    this.setColor(hslToRgb(this.hue));

    const {data} = this.image.imageData;
    const [r, g, b] = hslToRgb(this.hue);
    for (let i = 0; i < data.length; i += 4) {
      data[i]     = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
  }

  private tickHue(count: number) {
    let hue = this.hue * 360;
    hue += count;
    if (hue > 360) {
      hue %= 360;
    }
    this.hue = hue / 360;
  }
}

class NoneColorBehavior extends ColorBehavior {
  tick() {
    const color = this.image.settings.getSetting('noneColor');
    this.setColor(color);
  }
}

class ClassicColorBehavior extends ColorBehavior {
  private currColor = 0;

  private readonly colors: readonly Color[] = [
    [255, 115, 0, 255], // orange
    [254, 0, 0, 255], // red
    [44, 0, 181, 255], // blue
    WHITE,
    [255, 236, 10, 255], // yellow
    [255, 34, 138, 255], // pink
  ];

  tick(count: number, tickStateDelta: TickStateDelta) {
    this.currColor = (this.currColor + hitDelta(tickStateDelta))
        % this.colors.length;
    this.setColor(this.colors[this.currColor]);
  }
}

function hitDelta(tickState: TickStateDelta, cornerCoefficient = 2): number {
  return (tickState.hitCorner ?? 0 * cornerCoefficient) + (tickState.hitWall ?? 0);
}


const imageDataCache = new Map<string, ImageData>();
async function loadImageData(fileName: string): Promise<ImageData> {
  if (imageDataCache.has(fileName)) {
    return imageDataCache.get(fileName)!;
  }
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  console.log('loading', fileName);
  img.src = fileName;
  try {
    await img.decode();
    const canvas = document.createElement('canvas');
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    imageDataCache.set(fileName, imageData);
    return imageData;
  } catch (error) {
    console.log('error loading image', fileName, error);
    throw error;
  }
  // return new Promise((resolve, reject) => {
  //   try {
  //     img.addEventListener('load', () => {
  //       resolve(imageData);
  //     });
  //     img.addEventListener('error', (...error) => {
  //       console.log(error);
  //       reject(error);
  //     });
  //   } catch (e) {
  //     reject(e);
  //   }
  // });
}