import React from 'react';
import {
  FitText,
  useMedia,
  useConfig,
  useTemplate,
  useTemplateVal,
  useTemplateBoolVal,
  useTemplateIntVal,
  useTemplateFloatVal,
  useScreenInfo,
} from '@dsplay/react-template-utils';
import './main.sass';


function Main() {

  const cfg = useConfig();
  const md = useMedia();
  const tpl = useTemplate();
  const { screenFormat } = useScreenInfo();

  const { orientation, locale } = cfg;
  const { duration } = md;

  return (
    <div className="main">
      <h1>DSPLAY Template</h1>
      <h2>Raw Values</h2>
      <div>
        <p>Config:</p>
        <pre>{JSON.stringify(cfg, null, 4)}</pre>

        <p>Media:</p>
        <pre>{JSON.stringify(md, null, 4)}</pre>

        <p>Template:</p>
        <pre>{JSON.stringify(tpl, null, 4)}</pre>
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
          <span className="val">{useTemplateVal('title', 'Default Value')}</span>
        </p>
        <p>
          Boolean:
          <span className="val">{useTemplateBoolVal('expanded', true) ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Int:
          <span className="val">{useTemplateIntVal('page_size', 10)}</span>
        </p>
        <p>
          Double:
          <span className="val">{useTemplateFloatVal('rate', 0.75)}</span>
        </p>
        <p>
          Image:
          <img className="val" alt="" src={useTemplateVal('logo')} />
        </p>
        <p>
          ScreenFormat:
          <span className="val">{screenFormat}</span>
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
