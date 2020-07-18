export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';
export const BANNER_H = 'banner-h';
export const BANNER_V = 'banner-v';
export const SQUARED = 'squared';

const BANNER_FACTOR = 4;
const SQUARED_FACTOR = 0.2;

export function calculateScreenInfo() {
  if (window) {
    const {
      innerHeight,
      innerWidth,
    } = window;
    const h = innerHeight;
    const w = innerWidth;
    let screenFormat = LANDSCAPE;

    const relation = Math.abs(1 - w / h);

    if (relation < SQUARED_FACTOR) {
      screenFormat = SQUARED;
    } else if (w / h > 1) {
      // horizontal
      const factor = w / h;

      if (factor >= BANNER_FACTOR) {
        screenFormat = BANNER_H;
      } else {
        screenFormat = LANDSCAPE;
      }
    } else {
      // vertical
      const factor = h / w;

      // console.log('v factor:', factor);
      if (factor >= BANNER_FACTOR) {
        screenFormat = BANNER_V;
      } else {
        screenFormat = PORTRAIT;
      }
    }

    return {
      w,
      h,
      screenFormat,
    };
  }

  return undefined;
}
