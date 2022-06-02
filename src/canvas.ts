import {Inject, InjectionToken} from './di';
import {Stats} from './stats';

export const CANVAS_OBJECTS = new InjectionToken<
    Promise<readonly CanvasObject[]>>('CanvasObjects');

export interface CanvasObject {
  tick(deltaTime: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
  resize(canvas: HTMLCanvasElement): void;
}

export class Canvas {
  private readonly canvas: HTMLCanvasElement = document.querySelector('canvas')!;
  private readonly ctx = this.canvas.getContext('2d')!;

  private currFrame = performance.now();
  private frameId?: number;
  private readonly objects: CanvasObject[] = [];

  constructor(
    @Inject(Stats) private readonly stats: Stats,
    @Inject(CANVAS_OBJECTS) objects: Promise<readonly CanvasObject[]>,
  ) {
    objects.then(objects => {
      objects.forEach(object => object.resize(this.canvas));
      this.objects.push(...objects);
    });
    this.resize();
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    for (const object of this.objects) {
      object.resize(this.canvas);
    }
  }

  private loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const now = performance.now();
    const deltaTime = now - this.currFrame;
    for (const object of this.objects) {
      object.tick(deltaTime);
      object.draw(this.ctx);
    }
    this.stats.render();
  
    this.currFrame = now;
    this.frameId = requestAnimationFrame(() => this.loop());
  }

  start() {
    this.loop();
  }

  stop() {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
    }
  }

  // addObjects(...objects: readonly CanvasObject[]) {
  //   this.objects.push(...objects);
  // }
}