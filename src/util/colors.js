export function hexToRgbObject(hexColor) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
  if (result) {
    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  }

  const result2 = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hexColor);
  if (result2) {
    return {
      r: parseInt(`${result2[1]}${result2[1]}`, 16),
      g: parseInt(`${result2[2]}${result2[2]}`, 16),
      b: parseInt(`${result2[3]}${result2[3]}`, 16),
    };
  }

  return undefined;
}

export function hexToRgb(hexColor) {
  const { r, g, b } = hexToRgbObject(hexColor) || {};

  if ((r && g && b) === undefined) return 'transparent';

  return `rgb(${r}, ${g}, ${b})`;
}

export function hexToRgba(hexColor, alpha) {
  const { r, g, b } = hexToRgbObject(hexColor) || {};

  if ((r && g && b) === undefined) return 'transparent';

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
