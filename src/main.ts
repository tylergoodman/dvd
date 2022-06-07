import {combineLatest, defer, distinctUntilChanged, firstValueFrom, from, map, switchMap} from 'rxjs';

import {BouncingImage} from './bouncing_image';
import {Canvas, CanvasObject} from './canvas';
import {Injector} from './di';
import {DEFAULT_WPE_SETTINGS, Settings} from './settings';
import {Stats, STATS_ELEMENT} from './stats';
import {nOf} from './util';


const permLogEl = document.querySelector('#permLog')!;
function permLog(string: string) {
  const child = document.createElement('p');
  child.innerText = string;
  permLogEl.appendChild(child);
}
(window as any).permLog = permLog;

const injector = new Injector();

injector.register(
  Canvas,
  Settings,
  Stats,
  {
    provide: STATS_ELEMENT,
    useValue: document.querySelector('p')!,
  },
);

async function main() {
  const canvas = injector.get(Canvas);
  const settings = injector.get(Settings);
  const stats = injector.get(Stats);

  const images: BouncingImage[] = [];
  settings.listenToSetting('imageFileName').subscribe(fileName => {
    for (const image of images) {
      image.setImage(fileName);
    }
  });
  settings.listenToSetting('objectsCount')
    .pipe(
      distinctUntilChanged(),
      switchMap(objectsCount => {
        const imageFileName = settings.getSetting('imageFileName')
            || DEFAULT_WPE_SETTINGS.imageFileName;
        const images = nOf(objectsCount, () => BouncingImage.fromFile(
            imageFileName, settings, stats));
        return firstValueFrom(defer(() => Promise.all(images)));
      }))
  .subscribe(img => {
    images.length = 0;
    images.push(...img);
    canvas.removeAllObjects();
    canvas.addObject(
      stats,
      ...images,
    );
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      image.tickPercent(i / images.length);
    }
  });

  canvas.addObject(stats);
  canvas.start();
}

document.addEventListener('DOMContentLoaded', main);
