# AGENTS.md

Guidance for AI agents (and humans) working in this repository.

## What this project is

A React boilerplate for building [HTML-based templates](https://developers.dsplay.tv/docs/html-templates) for the [DSPLAY - Digital Signage](https://dsplay.tv/) platform, built with [Vite](https://vitejs.dev/). Requires Node.js 22.22.2+, 24.15.0+, or 26+ (see `.nvmrc`) — raised from 20.19+/22.12+ to satisfy `jsdom@30`'s engine requirement.

Most people who touch this repo are building their **own** template by cloning it, customizing `src/components/`, and never pushing back here — they diverge immediately (README.md tells them to `rm -rf .git && git init` right after cloning). The README's "Maintaining this boilerplate" section (dependency updates, this AGENTS.md) is only relevant to the DSPLAY team keeping *this* repo current for the next person who clones it.

## Directory structure

```
index.html                 <-- Vite entry point
vite.config.js             <-- includes @dsplay/template-manifest's Vite plugin (see below)
public/
  dsplay-data.js            <-- mock DSPLAY data for local development
  test-assets/              <-- dev-only assets, excluded from the release build
src/
  index.jsx                 <-- React entry point
  components/
    app/                     <-- top-level component (loader, fonts, i18n)
    intro/                   <-- loading placeholder
    main/                    <-- where the example template values are read/rendered
build.sh                    <-- zips the Vite build output into template.zip
```

## Runtime model

- `public/dsplay-data.js` defines `dsplay_config`, `dsplay_media`, and `dsplay_template` mock globals used only in **development**. `build.sh` blanks its content in the production build — the DSPLAY Android app injects the real `window.DSPLAY.getData()` before any script runs.
- `@dsplay/react-template-utils` (which wraps `@dsplay/template-utils`) exposes `useTemplateVal`/`useTemplateBoolVal`/`useTemplateIntVal`/`useTemplateFloatVal` (read a `dsplay_template` variable as string/boolean/integer/float, with an optional default), plus `useTemplate()`/`useMedia()`/`useConfig()` for the raw objects.
- Template logic lives in `src/components/` — `src/components/main/index.jsx` is the reference example of reading template variables.

## Template variable manifest

`vite.config.js` registers `@dsplay/template-manifest`'s Vite plugin, which on every build statically scans `src/` for `tval`/`useTemplateVal`-style reads and captures `public/dsplay-data.js` as example data, writing `template-variables.json` + `template-example-data.json` into the build output — and therefore into `template.zip` (`npm run zip` runs `build.sh`, which zips the whole build output). The DSPLAY CMS reads these two files to auto-detect a template's variables and seed default preview values, instead of requiring manual registration. See [@dsplay/template-manifest](https://www.npmjs.com/package/@dsplay/template-manifest) for exactly what it detects.

## Commands

- `npm start` — dev server (Vite).
- `npm run build` — production build (runs the linter first via the `prebuild` script).
- `npm test` / `npm run test:watch` — Vitest.
- `npm run linter` / `npm run linter:fix` — ESLint on `src`.
- `npm run zip` — builds, then runs `build.sh` to produce `template.zip` ready for the [DSPLAY Web Manager](https://manager.dsplay.tv/template/create). `build/` and `template.zip` are gitignored.

## Dependency management (boilerplate maintainers only)

Regular npm dependencies, not vendored files — `npm outdated` / `npm update` for in-range bumps. For an out-of-range (typically major) bump, apply it deliberately and verify `npm start`, `npm run build`, and `npm test` still work before committing — this boilerplate is consumed by other templates, so treat major bumps of `@dsplay/react-template-utils` especially carefully.

## Commit messages

Every commit title must start with an emoji, followed by a short, imperative summary — e.g. `⬆️ upgrade deps`.

- The human maintainer uses [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) for manual commits, so gitmoji conventions (`✨` feature, `🐛` fix, `⬆️` upgrade deps, `♻️` refactor, `📝` docs, `🎨` structure/format) are a good default.
- Agents are not required to stick to the official gitmoji list — pick whichever emoji best represents the actual change in that commit, as long as it's placed at the start of the title.
- Version bumps (`package.json`'s `version` field) get their own commit, titled with just the version number and no emoji (e.g. `4.1.0`), separate from the commit(s) that made the actual change — see the git log for examples.
