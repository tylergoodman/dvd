import {Color} from './types';

export const WHITE: Color = [255, 255, 255, 255];

export function flattenMapValues<V>(map: Map<unknown, V>): FlatArray<V[], 1>[] {
  const valuesAsArray = Array.from(map.values());
  return valuesAsArray.flat();
}
/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
 export function hslToRgb(h: number, s = 0.5, l = 0.5): Color {
  var r, g, b;

  if (s == 0){
      r = g = b = l; // achromatic
  } else{
      var hue2rgb = function hue2rgb(p: number, q: number, t: number) {
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 255];
}
export function gcd(a: number, b: number): number {
  var t = 0;
  a < b && (t = b, b = a, a = t); // swap them if a < b
  t = a%b;
  return t ? gcd(b,t) : b;
}
export function lcm(a: number, b: number): number {
  return a/gcd(a,b)*b;
}
export function isEqual(a: unknown, b: unknown) {
  return a === b;
}
export function arrayEqual<
    A extends ArrayLike<unknown>,
    B extends ArrayLike<unknown>>(a: A, b: B): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!isEqual(a[i], b[i])) return false;
        }
        return true;
      }
export function objectEquals<T extends {[i: string]: unknown}>(a: T, b: T) {
  if (a === b) return true;
  const aKeys = Object.keys(a);
  const bKeys = new Set(Object.keys(b));
  if (aKeys.length !== bKeys.size) return false;
  for (const aKey of aKeys) {
    const aValue = a[aKey];
    const bValue = b[aKey];
    if (aValue !== bValue) return false;
    bKeys.delete(aKey);
  }
  if (bKeys.size) return false;
  return true;
}
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
export function memoize<F extends (...args: unknown[]) => unknown>(fn: F): F {
  let lastArgs: Parameters<F>;
  let lastValue: ReturnType<F>;
  const memoized = ((...args: Parameters<F>) => {
    if (!lastArgs || !arrayEqual(lastArgs, args)) {
      lastArgs = args;
      lastValue = fn.apply(null, args) as ReturnType<F>;
    }
    return lastValue;
  }) as F;
  return memoized;
}