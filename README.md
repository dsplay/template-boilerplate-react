# DSPLAY - React Template Boilerplate

You can use this project as a skeleton for creating a new HTML-based template for [DSPLAY](https://dsplay.tv).

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Getting started

```
git clone https://github.com/dsplay/template-boilerplate-react.git my-awesome-template
cd my-awesome-template
rm -rf .git
npm i
npm start
```

## Basics

## Structure and `index.html`

All DSPLAY templates are just simple HTML projects. The only requirement regarding the project structure is that you must have a `index.html` in the root of your project, and a file called `dsplay-data.js` located anywhere. The rest of the structure is up to you.

A sample project structure can be something like:

```
/my-template
  index.html
  /scripts
    dsplay-data.js
  /images
  /stules
```

## Packing

To upload your template to the [DSPLAY Web Manager](https://manager.dsplay.tv) you must packing all your files in a `.zip` file.

> **IMPORTANT:** When zipping your template, the `index.html` file must be located in the root of the `.zip` file, not inside any folder.


## `dsplay-data.js`

That's where the magic happens.

All DSPLAY HTML template must have a file called `dsplay-data.js`, located anywhere and "imported" in your `index.html`. This file must contain 3 variables, like this:

```js
var dsplay_media = {
};

var dsplay_config = {
};

var dsplay_template = {
};

```

In this boilerplate project, `dsplay-data.js` is located at `public` folder.

> During template development, `dsplay-data.js` will be just a mock with your test data. The DSPLAY Player App will automatically replace this file with real content at runtime.

### Provided info

The content of `dsplay_media` and `dsplay_config` is predefined by DSPLAY. 

The content of `dsplay_template` must be defined by you (template creator). 

> remember to register the variables defined in `dsplay_template` as "Template Vars" in the template creation form (on [DSPLAY Web Manager](https://manager.dsplay.tv/template/create)), informing the same name and type

Follows the list of available fields with sample values and description.

```js
var dsplay_media = {
  // General Info
  id: 1, // Media ID
  name: 'My Media', //
  count: 25, // A internal counter that stores how many media items were played until this point
  iteration: 4, // A internal counter that stores haw many times this particular media was played
  duration: 15000, // The media duration in milliseconds
  
  // Image Media specific
  imagePath: '/path/to/image', // The path of the selected image
  images: ['/path/to/image/1', '/path/to/image/2'], // Paths of all images
  
  // RSS Media specific
  imageUrl: '/path/to/image', // Image path of selected RSS Item (if available)
  imageTitle: 'Image Title', // Title of RSS item image (if available)
  qrCode: '/path/to/qrcode', // Path to auto-generated QRCode image
  hasImage: true, // A flag indicating if the current item has image
  itemDescription: 'Description', // RSS item description
  itemContent: 'Content', // RSS item content
  itemTitle: 'Item Title', // RSS item title
  source: 'CNN', // An internal control field indicating the source of RSS. 
                 // You define the value of source when create a RSS Channel.
  title: 'Breaking News', // The media title
  
  // Brazilian Weather Forecast
  title: 'Weather Forecast'
  city: 'Recife',
  text: 'Céu Nublado com Pancadas de Chuva',
  weatherCode: 'ps' // possible values in http://servicos.cptec.inpe.br/XML/#condicoes-tempo
  forecasts: [
    {
      code: 'ps' // possible values in http://servicos.cptec.inpe.br/XML/#condicoes-tempo
      date: 'Hoje'
      min: 25,
      max: 30,
      uvi: 10,
    },
    {
      code: 'ps' // possible values in http://servicos.cptec.inpe.br/XML/#condicoes-tempo
      date: '27/03/2014'
      min: 25,
      max: 30,
      uvi: 10,
    },
    {
      code: 'ps' // possible values in http://servicos.cptec.inpe.br/XML/#condicoes-tempo
      date: '28/03/2014'
      min: 27,
      max: 30,
      uvi: 11,
    },
    {
      code: 'ps' // possible values in http://servicos.cptec.inpe.br/XML/#condicoes-tempo
      date: '29/03/2014'
      min: 22,
      max: 28
      uvi: 10,
    },
  ],

  // Brazilian Daily Horoscope
  // (the `iteration` variable can be used to rotate between signs)
  title: 'Daily Horoscope',
  signs: [
    {
      name: "Aries",
      text: "bla bla bla ...",
    },
    {
      name: "Touro",
      text: "bla bla bla ...",
    },
    // ... same for others
  ],
    
  // JSON Service specific
  result: {} // A JSON object containg the service result
  
  // Social Media service (Twitter or Instagram)
  result: {
    data: {
      user: {
        id: "1234567890",
        name: "DSPLAY - Digital Signage",
        username: "dsplaytv",
        pic: "/path/to/profile/picture",
      },
      posts: [
        {
          id: "0987654321", // post id
          text: "Post text",
          created: "2018-06-17T17:24:51.000Z", // post creation date
          media: [ // list of post media
            {
              id: "1324354657687980", // media id
              type: "image", // media type ("image" or "video")
              urls: { // paths to media images
                tb: "/path/to/thumbnail",
                sm: "/path/to/small",
                md: "/path/medium",
                lg: "/path/to/large"
              }
            }
        ],
        link: "https://link/to/original/post",
        tags: [
          "myhashtag",
          "tag2",
        ],
        likes: 14,
        comments: 0
        shares: 6,
        },
      ]
    }
  }
};

var dsplay_config = {
  orientation = 'landscape', // 'landscape' or 'portrait'
  width: 1280, // Screen width of device
  height: 720, // Screen height of device
  os: 'android', // for future use
  osVersion: 17, // Android SDK version
  appVersion: 101, // DSPLAY App version code
  appVersionName '2.14.1', // DSPLAY App version name
  locale: 'en_us', // Current locale
};

// All fields here are custom and template specific
var dsplay_template = {
  my_color: '#FF4477',
  my_image: '/path/to/image',
  my_flag: 'true', // boolean
  ...
};


```

### Using `dsplay-data.js` vars in template

The easiest way to access `dsplay-data.js` var values in your project is by using the support library `@dsplay/template-utils` (already included in this boilerplate). 

Here is a small snippet showing how to get values inside a React component:

```jsx
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
```

## Release build

To create a release build of the template, ready to be uploaded to DSPLAY, just run:

```
npm run zip
```
