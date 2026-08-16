![DSPLAY - Digital Signage](https://developers.dsplay.tv/assets/images/dsplay-logo.png)

# DSPLAY - React Template Boilerplate

This is a [React](https://reactjs.org/) boilerplate for building [HTML-based templates](https://developers.dsplay.tv/docs/html-templates) for the [DSPLAY - Digital Signage](https://dsplay.tv/) platform.

You can use this project as a skeleton for creating a new HTML Template with React. If you prefer to use another JS library, check the [other boilerplates](https://developers.dsplay.tv/docs/html-templates/boilerplates/) available.

> This project is built with [Vite](https://vitejs.dev/) and requires Node.js 22.22.2+, 24.15.0+, or 26+ (see `.nvmrc`).

This README has two audiences:
- **[Building your own template](#building-your-own-template)** — if you cloned this repo to create a new DSPLAY template.
- **[Maintaining this boilerplate](#maintaining-this-boilerplate)** — for the DSPLAY team, keeping this repo itself up to date for future template authors.

---

## Building your own template

### Getting started

```sh
git clone https://github.com/dsplay/template-boilerplate-react.git my-awesome-template
cd my-awesome-template
rm -rf .git
git init
npm install
npm start
```

You're now developing your own template, detached from this boilerplate's history — changes here don't get pushed back to `dsplay/template-boilerplate-react`.

### `dsplay-data.js`

In this boilerplate, `dsplay-data.js` is located at the `public` folder.

> During template development, `dsplay-data.js` is just a mock with your test data. The DSPLAY Player App replaces it with real content at runtime.

### Using template/media/config values in your template

The easiest way to access `dsplay-data.js` values in your project is through [`@dsplay/react-template-utils`](https://github.com/dsplay/react-template-utils) (already included in this boilerplate).

```jsx
// src/components/main/index.jsx
import {
  useMedia,
  useConfig,
  useTemplate,
  useTemplateVal,
  useTemplateBoolVal,
  useTemplateIntVal,
  useTemplateFloatVal,
  useScreenInfo,
} from '@dsplay/react-template-utils';

function Main() {
  const config = useConfig();
  const media = useMedia();
  const template = useTemplate();
  const { screenFormat } = useScreenInfo();

  const { locale } = config;
  const { duration } = media;

  return (
    <div className="main">
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
      <p>Locale: <span className="val">{locale}</span></p>

      <h2>Media Values Examples</h2>
      <p>Duration: <span className="val">{duration}</span></p>

      <h2>Custom Template Var Examples</h2>
      <div>
        <p>String: <span className="val">{useTemplateVal('title', 'Default Value')}</span></p>
        <p>Boolean: <span className="val">{useTemplateBoolVal('expanded', true) ? 'Yes' : 'No'}</span></p>
        <p>Int: <span className="val">{useTemplateIntVal('page_size', 10)}</span></p>
        <p>Double: <span className="val">{useTemplateFloatVal('rate', 0.75)}</span></p>
        <p>Image: <img className="val" alt="" src={useTemplateVal('logo')} /></p>
        <p>ScreenFormat: <span className="val">{screenFormat}</span></p>
      </div>
    </div>
  );
}

export default Main;
```

`useTemplateVal`/`useTemplateBoolVal`/`useTemplateIntVal`/`useTemplateFloatVal` read a `dsplay_template` variable as string/boolean/integer/float, with an optional default value used when the variable is unset. See `src/components/main/index.jsx` in this boilerplate for a working, up-to-date version of this example.

> Once you've settled on your template's variables, document them in your own README (a `Key | Type | Default | Description` table) and remember to register them as Template Vars (same name and type) when configuring your template in the DSPLAY CMS.

### Running tasks during the intro (and handling failures)

`Loader`'s `tasks` prop (see `src/components/app/index.jsx`) accepts an array of promises to await before the intro placeholder is dismissed — useful if your template needs to fetch some data before it can render anything meaningful. Their settled values are exposed via `LoaderContext` as `tasksResults`, in the same order.

A rejected task doesn't block the others, and it won't leave the intro stuck forever either: it settles as `undefined` in `tasksResults` at that index, with the rejection reason exposed in parallel via `tasksErrors`. Check `tasksErrors` anywhere you'd otherwise assume a task's data loaded successfully:

```jsx
// src/components/main/index.jsx
import { useContext } from 'react';
import { LoaderContext } from '@dsplay/react-template-utils';

function Main() {
  const { tasksResults: [myData], tasksErrors: [myDataError] } = useContext(LoaderContext);

  if (myDataError) {
    return <p>Something went wrong loading the data.</p>; // real templates should use react-i18next's t() here
  }

  return <p>{myData}</p>;
}
```

This boilerplate's own `src/components/app/index.jsx` and `src/components/main/index.jsx` include a small working example of a task that deliberately fails, for reference. See [`template-flight-information`](https://github.com/dsplay/template-flight-information) for a complete, production example built on this pattern (a translated error message shown only when there's truly no data to fall back on — not just on any single failed fetch).

### Test assets

To use test assets (images, videos, etc) during development, put them in the `public/test-assets` folder and reference them in `dsplay-data.js` using their relative path:

```js
// public/dsplay-data.js

// ... other objects

var dsplay_template = {
  //... other fields
  my_image: '../test-assets/my-image.png',
};
```

> The `public/test-assets` folder is automatically excluded from the release build.

### Packing (release build)

To create a release build of the template, ready to be uploaded to DSPLAY, just run:

```sh
npm run zip
```

This builds the template with Vite, which also generates `template-variables.json` + `template-example-data.json` (via [@dsplay/template-manifest](https://www.npmjs.com/package/@dsplay/template-manifest)'s Vite plugin) — the DSPLAY CMS reads these two files to auto-detect this template's variables and seed default preview values, instead of requiring manual registration. It then generates a `template.zip` file ready to be deployed to the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create).

---

## Maintaining this boilerplate

This section is for the DSPLAY team, keeping this boilerplate itself current for the next person who clones it.

### Updating dependencies

Unlike the vanilla-js/jQuery boilerplates, dependencies here are regular npm packages, not vendored files — there's no custom script involved:

```sh
npm outdated   # see what has newer versions available
npm update     # bump within the ranges already declared in package.json
```

For a version that falls outside the declared range (typically a major bump, e.g. a new `@dsplay/react-template-utils` major), bump it deliberately in `package.json` and test the boilerplate still works (`npm start`, `npm run build`, `npm test`) before committing — major bumps may contain breaking changes and this boilerplate is consumed by other templates.

### Commit conventions

See [AGENTS.md](AGENTS.md).

## More

To see more about DSPLAY HTML Templates, visit: https://developers.dsplay.tv/docs/html-templates
