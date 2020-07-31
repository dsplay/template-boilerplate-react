/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import { calculateScreenInfo } from '../util/screen';

export function useScreenInfo() {
  const [state, setState] = useState(calculateScreenInfo());

  useEffect(() => {
    let timeout = null;

    const resizeListener = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // console.log('setting state..');
        setState(calculateScreenInfo());
      }, 250);
    };

    window.addEventListener('resize', resizeListener);

    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return state;
}
