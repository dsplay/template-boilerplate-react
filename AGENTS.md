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

## File and folder naming

- **kebab-case everywhere** in `src/` (and anywhere else in this repo we author ourselves) — folders, JS/JSX files, Sass files, test files. E.g. `setup-tests.js`, not `setupTests.js`. This does *not* apply to files whose name is a fixed convention from tooling (`package.json`, `README.md`, `vite.config.js`, `.nvmrc`, etc.) — only to files/folders we're free to name.
- **Every component gets its own folder with an `index.jsx`.** For a simple component, `index.jsx` *is* the component. For a component that grows into several files (hooks, sub-components, helpers), `index.jsx` becomes a barrel that re-exports the folder's public API — internal files stay internal, not imported directly from outside the folder.
- **Always import a component by its folder, never by reaching into `index`** — `import Main from './main'`, never `import Main from './main/index'` or `.../main/index.jsx`. Same for barrels: consumers import from the folder, not from whichever internal file happens to implement the piece they want.

## README structure

Every DSPLAY template's `README.md` follows the same skeleton (this repo's is the reference copy — most sections below aren't applicable to a generic boilerplate, only to an actual template):

1. Logo badge + `# DSPLAY - <Name>` + a one/two-sentence description.
2. *(optional, only if the template has more than one visual arrangement)* **Features** — named widgets/modes, and any special in-text commands (e.g. a menu-board template's `/cb`/`/pb`/`/n` line-break codes).
3. *(optional, only if appearance changes meaningfully by screen format)* **Supported screen formats** — a table with a screenshot per format (landscape/portrait/square/horizontal banner).
4. **Template variables** — a `Key | Type | Default | Description` table; this is the one section every real template has. Add a `### <variable> syntax` sub-section when a single variable's value is itself a small grammar worth explaining (e.g. an ordering string like `"c,w,q,n"`) rather than cramming it into the table cell. End with: "Remember to also register these as Template Vars (same name and type) when configuring this template in the DSPLAY CMS."
5. **Local development** — `npm install && npm start`, plus the `dsplay-data.js` explanation.
6. *(optional, only if some customization requires editing code rather than a variable)* **For developers** — a short list of `customization -> file path` pointers (e.g. loader animation, translations).
7. **Test assets**, **Packing (release build)**, **Maintaining dependencies** (-> AGENTS.md), **More** — same wording as this repo's README.md.

Skip a numbered section entirely rather than including it empty — don't pad a simple template's README with a "Features" heading that has nothing under it.

## Internationalization (i18n)

- **Every static, developer-authored piece of UI text must go through `react-i18next`'s `t()`** — never a hardcoded string in JSX. This does *not* apply to the actual content of a `dsplay_template` variable (e.g. an alert message a CMS user typed in) — only to text the template's own code puts on screen (labels, fallback/error text, etc.).
- **The i18n key is the English text itself** (`keySeparator: false`, matching `t('Media')` not `t('media.label')`), and **the `en` resource entry must explicitly map every key to itself** — never leave `en` sparse/empty relying on i18next's implicit key-as-fallback behavior.
- **Every template must provide translations for at least: `en`, `pt`, `es`, `it`, `de`, `nl`** (bare ISO codes, not region variants like `pt_br`). `dsplay_config.locale` comes in as a region-qualified string (e.g. `pt_br`) — split it before calling `changeLanguage`: `const [lng] = locale.split('_'); i18n.changeLanguage(lng);`. A template may support additional languages beyond these six, but never fewer.
- **Audit `t()` call sites against `src/i18n.js`'s resources whenever either changes** — the same way we audit CSS classes against what's actually used in `## File and folder naming`'s section above: a key used in a `t()` call but missing from one or more required languages is a bug (silently falls back, may show English or the raw key); a key defined in `resources` but never referenced by any `t()` call is dead and should be removed. This has already caught real bugs here (`t('Context')`/`t('Template')` were used with no translations defined, while `Title`/`Orientation` were defined but never used) — don't assume it's already correct just because it predates you.

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

### Known pending bump: ESLint 9 -> 10

`eslint`/`@eslint/js` are pinned to `^9.39.5` (latest is `10.x`). Bumping them currently fails on peer dependency conflicts: `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and `eslint-plugin-react` haven't declared ESLint 10 support yet as of 2026-08-12 — they're still the actively-maintained canonical packages, not abandoned or superseded, just lagging behind the major. `eslint-plugin-react-hooks` already supports it. `eslint-plugin-unicorn` is pinned to `65.0.1` for the same reason (`66.0.0+` requires ESLint `>=10.4`) — re-check peer ranges periodically and bump all of them together once the laggards catch up. Don't force any of this with `--legacy-peer-deps`.

## Commit messages

Every commit title must start with an emoji, followed by a short, imperative summary — e.g. `⬆️ upgrade deps`.

- The human maintainer uses [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) for manual commits, so gitmoji conventions (`✨` feature, `🐛` fix, `⬆️` upgrade deps, `♻️` refactor, `📝` docs, `🎨` structure/format) are a good default.
- Agents are not required to stick to the official gitmoji list — pick whichever emoji best represents the actual change in that commit, as long as it's placed at the start of the title.
- Version bumps (`package.json`'s `version` field) get their own commit, titled with just the version number and no emoji (e.g. `4.1.0`), separate from the commit(s) that made the actual change — see the git log for examples.
