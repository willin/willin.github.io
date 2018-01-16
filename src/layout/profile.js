import { h } from 'hyperapp';

export default ({ state: { i18n } }) => (
  <article id="profile" class="hidden">
    <section>
      <div class="avatar"></div>
      <h1>{i18n.willin}</h1>
      <h3>{i18n.subtitle}</h3>
      <p>{i18n.introduction}</p>
    </section>
    <aside>
      <ul>
        {i18n.tags.map(([x, y]) => (
          <li><label>{x}</label> <span>{y}</span></li>
        ))}
      </ul>
    </aside>
  </article>
);
