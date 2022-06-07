import {Inject, InjectionToken} from './di';
import {CustomBackgroundStyle, Settings} from './settings';
import {isNever} from './util';

export interface CanvasObject {
  tick?(deltaTime: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
  resize?(canvas: HTMLCanvasElement): void;
}

export class Canvas {
  private readonly canvas: HTMLCanvasElement = document.querySelector('canvas')!;
  private readonly ctx = this.canvas.getContext('2d')!;

  private currFrame = performance.now();
  private frameId?: number;
  private readonly objects: CanvasObject[] = [];

  constructor(@Inject(Settings) private readonly settings: Settings) {
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
    // So we don't have to make a new function in every loop. Does this matter?
    // No.
    this.loop = this.loop.bind(this);

    this.settings.listenToSetting('customBackground').subscribe(fileName => {
      this.setBackgroundImage(fileName);
    });

    this.settings.listenToSetting('customBackgroundStyle')
        .subscribe(backgroundStyle => {
          this.setBackgroundStyle(backgroundStyle);
        });
  }

  private setBackgroundImage(fileName: string) {
    this.canvas.style.backgroundImage = fileName === '' ? '' :
          `url('file:///${fileName}')`;
  }

  private setBackgroundStyle(backgroundStyle: CustomBackgroundStyle) {
    // Assumes we've already set the background image
    switch (backgroundStyle) {
      case 'tile':
        this.canvas.style.backgroundPosition = '';
        this.canvas.style.backgroundRepeat = 'repeat';
        this.canvas.style.backgroundSize = '';
        return;
      case 'center':
        this.canvas.style.backgroundPosition = 'center';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundSize = '';
        return;
      case 'fit':
        this.canvas.style.backgroundPosition = 'center';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundSize = '100% 100%';
        return;
      case 'fill':
        this.canvas.style.backgroundPosition = 'center';
        this.canvas.style.backgroundRepeat = 'no-repeat';
        this.canvas.style.backgroundSize = 'cover';
        return;
      default:
        isNever(backgroundStyle);
        return;
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    for (const object of this.objects) {
      object.resize?.(this.canvas);
    }
  }

  addObject(...objects: readonly CanvasObject[]) {
    this.objects.push(...objects);
    this.resize();
  }

  removeAllObjects() {
    this.objects.length = 0;
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = undefined;
    }
  }

  start() {
    this.loop();
  }

  private loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const now = performance.now();
    const deltaTime = now - this.currFrame;
    for (const object of this.objects) {
      object.tick?.(deltaTime);
      object.draw(this.ctx);
    }
  
    this.currFrame = now;
    this.frameId = requestAnimationFrame(this.loop);
  }
}