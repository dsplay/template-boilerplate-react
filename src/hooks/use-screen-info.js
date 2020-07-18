/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import { calculateScreenInfo } from '../util/screen';

export function useScreenInfo() {
  const [state, setState] = useState(calculateScreenInfo());

  useEffect(() => {
    let listener;
    let timeout;

    if (window) {
      listener = window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setState(calculateScreenInfo());
        }, 250);
      });
    }

    return () => {
      if (window) {
        if (listener) window.removeEventListener('resize', listener);
        clearTimeout(timeout);
      }
    };
  }, []);

  return state;
}
