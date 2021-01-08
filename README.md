# 11tyboo

> An organised 11ty boilerplate to get you up and running fast. Features TypeScript, native JSX support via Preact, CSS Modules with SASS, a well defined webpack config for great DX, and all pre-optimised for performance.

## Why

Getting setup with the necessary tooling to handle TypeScript, JSX, dynamic imports, SASS etc is time consuming. This project also has partial hydration to reduce the amount of code shipped to your users.

## Structure

The project is structured via the module pattern, files are grouped via feature, e.g `./src/modules/home`. This allows you to better future proof your application as it grows, and localise code where it's needed. Your page `*.11ty.tsx` files reside within their relevant feature folder, and export a `permalink` property for [you to define their url structure](https://github.com/jhukdev/11tyboo/blob/master/src/modules/home/home.11ty.tsx#L50), e.g:

```javascript
module.exports = {
  render: Page,
  data: () => ({
    permalink: '/my-feature/index.html',
  }),
};
```

## Styling

11tyboo comes pre-setup with support for CSS Modules and SASS. You have two options to import styles, globally or localised. To convert a SASS or CSS file into a CSS Module, you'll need to apply a `.module` suffix to your file, e.g `login.module.css`. You can then import this directly into a component:

```jsx
import style from './login.module.scss';

/*[...]*/

function Login() {
  return <form class={style.form}>/*[...]*/</form>;
}
```

To import styles globally, just add a non return import statement to the file you wish to load them from, e.g:

```jsx
import './global.css';

/*[...]*/
```

## Hydration

11tyboo comes with a dedicated function for you to apply [partial hydration](https://www.jameshill.dev/articles/partial-hydration/). This works as an HOC, wrapping the component you wish to hydrate on the client. You can apply this as follows:

```jsx
import { applyHydration } from '@/utility/hydrate.utility';

/*[...]*/

function MainForm() {
  return <form>/*[...]*/</form>;
}

/*[...]*/

const Form = applyHydration('Form', MainForm);

/*[...]*/

export { Form };
```

It's recommded that you create components within their own folder, and apply this function in an `index.ts` file within. That way you can seperate any "transforms" the component might need at runtime with the component itself, you can [see an example here](https://github.com/jhukdev/11tyboo/blob/master/src/modules/home/components/form/index.ts).

Once you have a hydrated component, you'll need to import it into an "Entry" file. These are suffixed with `.entry`, and must be placed within their respective module folder, e.g `./src/home/home.entry.ts`.

This entry file needs to import your hydrated components, e.g:

```javascript
import '@/modules/home/components/form';
```

This file is then referenced within your `.11ty.tsx` file, by passing it into the `<Html>` component via `jsPath`, e.g:

```jsx
/*[...]*/

import { Html } from '@/modules/shared/components';

/*[...]*/

function Page() {
  return <Html jsPath="home/home.entry.js">/*[...]*/</Html>;
}

/*[...]*/

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'index.html',
  }),
};
```

For a working example, [take a look at the `home` module here](https://github.com/jhukdev/11tyboo/blob/master/src/modules/home/home.11ty.tsx#L28).

## Installation

### 1. Clone or download the repository

```shell
git clone git@github.com:jhukdev/11tyboo.git
```

### 2. Install the project dependencies

```shell
yarn
```

## Development

```shell
yarn start
```

## Build production

```shell
yarn build
```
