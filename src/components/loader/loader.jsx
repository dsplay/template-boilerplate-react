import React, { useState, useEffect, useCallback } from 'react';
import ImageLoader from '../image-loader/image-loader';
import FontLoader from '../font-loader/font-loader';
import { wait } from '../../util/time';

const style = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  margin: 0,
  // backgroundColor: 'purple',
};

function Loader({
  fontFamilies,
  images,
  placeholder = <div>loading...</div>,
  children,
  minLoadingTime = 0,
  tasks = [],
}) {
  const [loadingMin, setLoadingMin] = useState(true);
  const [loadingFonts, setLoadingFonts] = useState(true);
  const [loadingImages, setLoadingImages] = useState(true);

  const handleImagesLoad = useCallback(() => {
    setLoadingImages(false);
  }, []);

  const handleFontsLoad = useCallback(() => {
    setLoadingFonts(false);
  }, []);

  useEffect(() => {
    if (loadingMin) {
      (async () => {
        await Promise.all([
          wait(minLoadingTime),
          ...tasks,
        ]);
        setLoadingMin(false);
        // console.log('min loading time passed', loadingMin, minLoadingTime, tasks);
      })();
    }
  }, [loadingMin, minLoadingTime, tasks]);

  if (loadingFonts || loadingImages || loadingMin) {
    // console.log('loading...');
    return (
      <div style={style}>
        {placeholder}
        <ImageLoader images={images} onLoad={handleImagesLoad} />
        <FontLoader families={fontFamilies} onLoad={handleFontsLoad} />
      </div>
    );
  }

  return children;
}

export default Loader;
