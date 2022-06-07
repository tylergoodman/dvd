import {CanvasObject} from './canvas';
import {Inject, InjectionToken} from './di';

export const STATS_ELEMENT = new InjectionToken<HTMLElement>('StatsElement');

/** Controls the statistical information displayed on screen. */
export class Stats implements CanvasObject {
  
  private readonly statCategories = new Map<StatCategory, readonly string[]>();
  private readonly stats = new Map<string, Stat>();
  private readonly mutedCategories = new Set<StatCategory>();

  private hasChanged = false;

  constructor(
      @Inject(STATS_ELEMENT) private readonly el: HTMLElement,
    ) {}

  registerStat(stat: Stat) {
    const statCategory = this.statCategories.get(stat.category) ?? [];
    this.statCategories.set(stat.category, [...statCategory, stat.id]);
    this.stats.set(stat.id, stat);
  }

  private isRegistered(statId: string): boolean {
    return this.stats.has(statId);
  }

  quickUpdate(category: StatCategory, stats:[Stat['label'], Stat['value']][]) {
    for (const [label, value] of stats) {
      const id = label; // label acts as id
      if (!this.isRegistered(id)) {
        this.registerStat({
          id,
          category,
          label,
          value,
        });
      } else {
        this.updateStat(id, value);
      }
    }
  }

  updateStat(id: Stat['id'], value: Stat['value']) {
    const savedStat = this.stats.get(id);
    if (!savedStat) {
      throw new Error(`Tried to update stat that hasn't been registered: ${id}`);
    }
    if (savedStat.value === value) return;
    this.stats.set(id, {
      ...savedStat,
      value,
    });
    if (!this.mutedCategories.has(savedStat.category)) {
      this.hasChanged = true;
    }
  }

  muteCategory(category: StatCategory, newIsMuted: boolean) {
    const oldIsMuted = this.mutedCategories.has(category);
    if (newIsMuted === oldIsMuted) return;
    this.hasChanged = true;
    if (newIsMuted) {
      this.mutedCategories.add(category);
    } else {
      this.mutedCategories.delete(category);
    }
  }

  draw(): void {
    if (!this.hasChanged) {
      return;
    }
    const statsToDisplay: string[] = [];
    for (const [category, statIds] of this.statCategories) {
      if (this.mutedCategories.has(category)) continue;
      for (const statId of statIds) {
        const stat = this.stats.get(statId);
        if (!stat) {
          throw new Error(`Missing stat with ID "${statId}"`);
        }
        const {label, value} = stat;
        if (value === undefined) continue;
        statsToDisplay.push(`${label}: ${value}`);
      }
    }
    this.el.innerText = statsToDisplay.join('\n');
    this.hasChanged = false;
  }
}

interface Stat {
  category: StatCategory;
  id: string;
  label: string;
  value: HasToString;
}

export enum StatCategory {
  STATS,
  TIME_TO_CORNER,
  DEBUG,
}

type HasToString = string | {toString(): string;};

