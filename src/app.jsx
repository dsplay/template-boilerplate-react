import React, { useState, useEffect } from 'react';
import Loader from './components/loader/loader';
import Main from './components/main/main';
import { waitForFonts } from './util/fonts';
import { useScreenInfo } from './util/screen';
import './app.sass';

function App() {
  const [loading, setLoading] = useState(true);
  const { screenFormat } = useScreenInfo();

  useEffect(() => {
    if (loading) {
      (async () => {
        await waitForFonts();
        setLoading(false);
      })();
    }
  }, [loading]);

  if (loading) {
    return (<Loader />);
  }

  return (
    <div className={`app fade-in ${screenFormat}`}>
      <Main />
    </div>
  )
}

export default App;
