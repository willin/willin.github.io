import { h } from 'hyperapp';
import i18n from '../i18n';

module.exports = ({ state: { locale } }) => (
  <article class="hidden" id="profile">
    <section>
      <div class="avatar"></div>
      <h1>{i18n('willin_wang', locale)}</h1>
      <h3>{i18n('subtitle', locale)}</h3>
      <p>{i18n('introduction', locale)}</p>
    </section>
    <aside>
      <ul>
        {i18n('tags', locale).map(([x, y]) => (
          <li><label>{x}</label> <span>{y}</span></li>
        ))}
      </ul>
    </aside>
  </article>
);
