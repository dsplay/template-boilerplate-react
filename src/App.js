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
import './App.css';

const { duration } = media;
const { orientation, locale } = config;

function App() {
    return (
        <div className="App">
            <h1>DSPLAY Template</h1>
            <h2>Raw Values</h2>
            <div>
                <p>
                    Media:
                    <pre>{JSON.stringify(media, null, 4)}</pre>
                </p>
                <p>
                    Config:
                    <pre>{JSON.stringify(config, null, 4)}</pre>
                </p>
                <p>
                    Template:
                    <pre>{JSON.stringify(template, null, 4)}</pre>
                </p>
            </div>
            <h2>Media Values Examples</h2>
            <div>
                <p>
                    Duration:
                    <span class="val">{duration}</span>
                </p>
            </div>
            <h2>Configuration Values Examples</h2>
            <div>
                <p>
                    Orientation:
                    <span class="val">{orientation}</span>
                </p>
                <p>
                    Locale:
                    <span class="val">{locale}</span>
                </p>
            </div>
            <h2>Custom Template Var Examples</h2>
            <div>
                <p>
                    String:
                    <span class="val">{tval('title', 'Default Value')}</span>
                </p>
                <p>
                    Boolean:
                    <span class="val">{tbval('expanded', true) ? 'Yes' : 'No'}</span>
                </p>
                <p>
                    Int:
                    <span class="val">{tival('page_size', 10)}</span>
                </p>
                <p>
                    Double:
                    <span class="val">{tfval('rate', .75)}</span>
                </p>
                <p>
                    Vertical?:
                    <span class="val">{isVertical ? 'Yes' : 'No'}</span>
                </p>
            </div>
        </div>
    );
}


export default App;
