import {BouncingImage} from './bouncing_image';
import {Canvas, CANVAS_OBJECTS} from './canvas';
import {Injector} from './di';
import {Settings} from './settings';
import {Stats, STATS_ELEMENT} from './stats';


const permLogEl = document.querySelector('#permLog')!;
function permLog(string: string) {
  const child = document.createElement('p');
  child.innerText = string;
  permLogEl.appendChild(child);
}

const injector = new Injector();

injector.register(
  Canvas,
  Settings,
  Stats,
  {
    provide: STATS_ELEMENT,
    useValue: document.querySelector('p')!,
  },
  {
    provide: CANVAS_OBJECTS,
    useFactory: async (settings: Settings, stats: Stats) => {
      const img = await BouncingImage.fromFile('./dvd.svg', settings, stats);
      return [img];
    },
    deps: [Settings, Stats],
  },
);



document.addEventListener('DOMContentLoaded', () => {
  const canvas = injector.get(Canvas);
  canvas.start();

  window.addEventListener('resize', () => {
    canvas.resize();
  });
});
