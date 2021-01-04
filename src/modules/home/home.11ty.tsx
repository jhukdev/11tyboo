import { h } from 'preact';
import style from './home.module.scss';

/* -----------------------------------
 *
 * Components
 *
 * -------------------------------- */

import { Html } from '@/modules/shared/components';
import { Form } from '@/modules/home/components/form';

/* -----------------------------------
 *
 * Page
 *
 * -------------------------------- */

function Page() {
  return (
    <Html title="Home - 11ty" cssPath="home/home.11ty.css" jsPath="home/home.entry.js">
      <main class={style.content}>
        <p class={style.text}>11ty Setup</p>
        <a href="/articles/first-post" class={style.link}>
          Go to the First post
        </a>
        <Form title="Hydrated Form" className={style.form} />
      </main>
    </Html>
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

module.exports = {
  render: Page,
  data: () => ({
    permalink: 'index.html',
  }),
};