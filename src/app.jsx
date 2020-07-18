import React from 'react';
import Loader from './components/loader/loader';
import Main from './components/main/main';
import { useScreenInfo } from './hooks/use-screen-info';
import { useLoader } from './hooks/use-loader';
import './app.sass';

const MIN_LOADING_DURATION = 2000;

function App() {
  const { screenFormat } = useScreenInfo();
  const loading = useLoader({ min: MIN_LOADING_DURATION });

  if (loading) {
    return (<Loader />);
  }

  return (
    <div className={`app fade-in ${screenFormat}`}>
      <Main />
    </div>
  );
}

export default App;
