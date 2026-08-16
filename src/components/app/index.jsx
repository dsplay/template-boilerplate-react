import { useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Loader, useScreenInfo, useTemplateVal } from '@dsplay/react-template-utils';
import Intro from '../intro';
import Main from '../main';
import i18n from '../../i18n';
import './style.sass';

// console.log(U, Loader)

const MIN_LOADING_DURATION = 2000;

// fonts to preload
// @font-face's must be defined in fonts.sass or another in-use style file
const fonts = [
  'Roboto Thin',
  'Roboto Light',
  'Roboto Regular',
  'Roboto Medium',
  'Roboto Bold',
  'Roboto Condensed',
  'Oswald',
];

// other tasks (Promises) to run during template intro - e.g. fetching data needed before the
// template can render. A rejected task no longer leaves Loader stuck on the placeholder forever:
// it settles as undefined in tasksResults at that same index, with the rejection reason exposed
// via tasksErrors on LoaderContext. The second task below deliberately fails to demonstrate this -
// see Main for how to read tasksErrors, and template-flight-information for a full example of an
// error UI built on top of it.
function createFailingExampleTask() {
  const failingTask = Promise.reject(new Error('example task failure'));
  // silences the "unhandled rejection" warning that'd otherwise fire before Loader's own
  // Promise.allSettled gets a chance to observe this same promise's rejection below
  failingTask.catch(() => {});
  return failingTask;
}

const tasks = [
  Promise.resolve('my promise result'),
  createFailingExampleTask(),
];

function App() {
  const { screenFormat } = useScreenInfo();
  const logo = useTemplateVal('logo');

  // images to preload
  const images = useMemo(() => [logo], [logo]);

  return (
    <I18nextProvider i18n={i18n}>
      <Loader
        placeholder={<Intro />}
        fonts={fonts}
        images={images}
        minDuration={MIN_LOADING_DURATION}
        tasks={tasks}
      >
        <div className={`app fade-in ${screenFormat}`}>
          <Main />
        </div>
      </Loader>
    </I18nextProvider>
  );
}

export default App;
