import {ReplaySubject} from 'rxjs';

import {Inject} from './di';
import {Stats, StatCategory} from './stats';
import {Color} from './types';
import {WHITE} from './util';

interface SettingsState extends PersistentSettings, WPESettings {}

interface PersistentSettings {
  wallsHit: number;
  cornersHit: number;
}

export type ColorBehaviorKind = 'none'|'rainbow'|'classic';

interface WPESettings {
  showStats: boolean;
  showTimeToCorner: boolean;
  showDebugInfo: boolean;
  colorBehavior: ColorBehaviorKind;
  rainbowSpeed: number;
  noneColor: Color;
  speed: number;
}

const DEFAULT_WPE_SETTINGS: WPESettings = {
  showStats: false,
  showTimeToCorner: false,
  showDebugInfo: false,
  colorBehavior: 'rainbow',
  rainbowSpeed: 0.05,
  noneColor: WHITE,
  speed: 0.25,
};

const parseNumberFactory = (
    parseFn: typeof Number.parseInt|typeof Number.parseFloat) =>
        (jsonString: string|null): number => {
          if (jsonString === null) {
            return 0;
          }
          return parseFn(jsonString, 10) || 0;
        };
const parseInt = parseNumberFactory(Number.parseInt);
const parseFloat = parseNumberFactory(Number.parseFloat);
const parseColor = (colorString: string|null): Color => {
  if (!colorString) return WHITE;
  const [r, g, b] = colorString.split(' ').map(parseFloat);
  return [r * 255, g * 255, b * 255, 255];
};

// This happens here so we can listen as soon as possible. Idk if it matters.
listenToWpeProperties(
  'showStats',
  'showTimeToCorner',
  'showDebugInfo',
  'colorBehavior',
  ['rainbowSpeed', parseFloat],
  ['noneColor', parseColor],
  ['speed', parseFloat],
);

const PERSISTENT_SETTINGS = [
  {key: 'cornersHit', statLabel: 'Corners hit', deserializer: parseInt},
  {key: 'wallsHit', statLabel: 'Walls hit', deserializer: parseInt},
] as const;

const WPE_SETTING_TO_STAT_CATEGORY: {[K in keyof WPESettings]?: StatCategory} = {
  showStats: StatCategory.STATS,
  showTimeToCorner: StatCategory.TIME_TO_CORNER,
  showDebugInfo: StatCategory.DEBUG,
};

export class Settings {
  private readonly settings = this.initializeSettings();

  constructor(
      @Inject(Stats) private readonly stats: Stats,
    ) {
      settingsSync.subscribe(partialWpeSettings => {
        // Update whether we should show some category of stats.
        for (const [setting, newValue] of Object.entries(partialWpeSettings)) {
          const statCategory =
              WPE_SETTING_TO_STAT_CATEGORY[setting as keyof WPESettings];
          if (statCategory !== undefined) {
            this.stats.muteCategory(
                statCategory,
                // !showX = shouldMuteCategory
                !newValue);
          }
        }
        Object.assign(this.settings, partialWpeSettings);
      });
    }

  setPersistedSetting<K extends keyof PersistentSettings>(
      key: K,
      value: PersistentSettings[K]|Identity<PersistentSettings[K]>,
      ): void {
        const oldValue = this.settings[key];
        if (typeof value === 'function') {
          value = value(oldValue);
        }
        if (value === oldValue) return;
        this.settings[key] = value;
        localStorage.setItem(key, value.toString());
        if (this.settings.showStats) {
          this.stats.updateStat(key, value);
        }
      }
  
  getSetting<K extends keyof SettingsState>(key: K): SettingsState[K] {
    return this.settings[key];
  }

  private initializeSettings(): SettingsState {
    const persistentSettings = Object.fromEntries(
        PERSISTENT_SETTINGS.map(({key, statLabel, deserializer}) => {
          return [key, this.initPersistentSetting(key, statLabel, deserializer)];
        })) as unknown as PersistentSettings;
    const wpeSettings: WPESettings = DEFAULT_WPE_SETTINGS;
    return {
      ...persistentSettings,
      ...wpeSettings,
    };
  }

  private initPersistentSetting<K extends keyof PersistentSettings>(
      key: K,
      label: string,
      deserialize: Deserializer<PersistentSettings[K]>,
    ): PersistentSettings[K] {
      const jsonString = localStorage.getItem(key);
      const deserilizedValue = deserialize(jsonString);
      this.stats.registerStat({
        category: StatCategory.STATS,
        id: key,
        label,
        value: deserilizedValue,
      });
      return deserilizedValue;
    }
}

type Identity<T> = (t: T) => T;
type Deserializer<T> = (jsonString: string|null) => T;

const settingsSync = new ReplaySubject<Partial<WPESettings>>(1);

interface WindowWithWPE extends Window {
  wallpaperPropertyListener: {
    applyUserProperties: (properties: {[index: string]: {value: any}}) => void;
  };
}

function listenToWpeProperties<K extends keyof WPESettings>(
    ...keys: (K|[K,Deserializer<WPESettings[K]>])[]) {
      (window as unknown as WindowWithWPE).wallpaperPropertyListener = {
        applyUserProperties(properties) {
          console.info('Property update', properties);
          const settingsToApply: Partial<WPESettings> = {};
          for (let key of keys) {
            let formatter: Deserializer<WPESettings[K]>|undefined = undefined;
            if (Array.isArray(key)) {
              formatter = key[1];
              key = key[0];
            }
            const property = properties[key.toLowerCase()];
            if (property) {
              settingsToApply[key] = formatter ? formatter(property.value) :
                  property.value;
            }
          }
          settingsSync.next(settingsToApply);
        },
      };
    }
