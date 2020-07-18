/* eslint-disable import/prefer-default-export */

import { useEffect, useState } from 'react';
import { wait } from '../util/time';
import { waitForFonts } from '../util/fonts';

export function useLoader({
  min = 0,
  tasks = [],
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      (async () => {
        await Promise.all([
          wait(min),
          waitForFonts(),
          ...tasks,
        ]);

        setLoading(false);
      })();
    }
  }, [loading, min, tasks]);

  return loading;
}
