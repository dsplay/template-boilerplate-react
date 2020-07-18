import React from 'react';
import {
  // values
  media, // current media
  config, // player configuration
  template, // custom template values
  // utility functions
  tval, // custom template string value
  tbval, // custom template boolean value
  tival, // custom template int value
  tfval, // custom template float value
  isVertical, // boolean flag to indicate screen orientation

} from '@dsplay/template-utils';
import './main.sass';
import FitText from '../fit-text/fit-text';

const { duration } = media;
const { orientation, locale } = config;

function Main() {
  return (
    <div className="main">
      <h1>DSPLAY Template</h1>
      <h2>Raw Values</h2>
      <div>
        <p>Config:</p>
        <pre>{JSON.stringify(config, null, 4)}</pre>

        <p>Media:</p>
        <pre>{JSON.stringify(media, null, 4)}</pre>

        <p>Template:</p>
        <pre>{JSON.stringify(template, null, 4)}</pre>
      </div>

      <h2>Configuration Values Examples</h2>
      <div>
        <p>
          Orientation:
          <span className="val">{orientation}</span>
        </p>
        <p>
          Locale:
          <span className="val">{locale}</span>
        </p>
      </div>
      <h2>Media Values Examples</h2>
      <div>
        <p>
          Duration:
          <span className="val">{duration}</span>
        </p>
      </div>
      <h2>Custom Template Var Examples</h2>
      <div>
        <p>
          String:
          <span className="val">{tval('title', 'Default Value')}</span>
        </p>
        <p>
          Boolean:
          <span className="val">{tbval('expanded', true) ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Int:
          <span className="val">{tival('page_size', 10)}</span>
        </p>
        <p>
          Double:
          <span className="val">{tfval('rate', 0.75)}</span>
        </p>
        <p>
          Image:
          <img className="val" alt="" src={tval('logo')} />
        </p>
        <p>
          Vertical?:
          <span className="val">{isVertical ? 'Yes' : 'No'}</span>
        </p>
      </div>
      <h2>Fit Text Example</h2>
      <div>
        <p>Short Text in box:</p>
        <div style={{
          border: '1px solid white', padding: '1em', width: '80%', height: '10em',
        }}
        >
          <FitText>Small</FitText>
        </div>
        <p>Long Text in box:</p>
        <div style={{
          border: '1px solid white', padding: '1em', width: '80%', height: '10em',
        }}
        >
          <FitText style={{ textAlign: 'center' }}>Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text Very Long Text </FitText>
        </div>
      </div>
    </div>
  );
}

export default Main;
