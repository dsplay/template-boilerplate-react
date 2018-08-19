# DSPLAY - React Template Boilerplate

You can use this project as a skeleton for creating a new HTML-based template for [DSPLAY](https://dsplay.tv).

## Getting started

```
git clone https://github.com/dsplay/template-boilerplate-react.git my-awesome-template
cd my-awesome-template
rm -rf .git
npm i
npm start
```

## Basics

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## `dsplay-data.js`

That's where the magic happens.

All DSPLAY HTML templates must have a file called `dsplay-data.js` in your template, located anywhere. This file must contain basically 3 variables, like this:

```js
var dsplay_media = {
};

var dsplay_config = {
};

var dsplay_template = {
};

```

In this boilerplate project the `dsplay-data.js` in located at `public` folder.

> During template development, `dsplay-data.js` will be just a mock with your test data. The DSPLAY Player App will automatically replace this file with real content at runtime.

### Provided info

The content of `dsplay_media` and `dsplay_config` are predefined by DSPLAY. 

The content of `dsplay_template` must be defined for you (template creator). 

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
  images: ['/path/to/image/1', '/path/to/image/1'], // Paths of all images
  
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

In this project you can access the values of `dsplay-data.js` through window global object. 

Here is a small snippet showing how to get media duration inside a React component:

```jsx
...
function MyComponent() {

  const { duration } = window.dsplay_media || window.media;

  return (
    <div>
      <h1>Duration: {duration}</h1>
    </div>
  )
}
...
```

> Notice that we use `window.dsplay_media || window.media`. This is a fallback for compatibility with previous DSPLAY Player versions, when the variables did not have the `dsplay_` prefix.

## Release build

To create a release build of the template, ready to be uploaded to DSPLAY, just run:

```
npm run zip
```
