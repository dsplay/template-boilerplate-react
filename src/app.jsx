import React from 'react';
import { tval } from '@dsplay/template-utils';
import Intro from './components/intro/intro';
import Loader from './components/loader/loader';
import Main from './components/main/main';
import { useScreenInfo } from './hooks/use-screen-info';
import './app.sass';

const MIN_LOADING_DURATION = 2000;
const logo = tval('logo');

// fonts to preload
// @font-face's must be defined in fonts.sass or other in-use style file
const fonts = [
  'Roboto Condensed',
  'Oswald',
];

// images to preload
const images = [
  logo,
];

// other tasks (Promises) to run during template intro
const tasks = [];

function App() {
  const { screenFormat } = useScreenInfo();

  return (
    <Loader

      placeholder={<Intro />}
      fontFamilies={fonts}
      images={images}
      minLoadingTime={MIN_LOADING_DURATION}
      tasks={tasks}
    >
      <div className={`app fade-in ${screenFormat}`}>
        <Main />
      </div>
    </Loader>
  );
}

export default App;
