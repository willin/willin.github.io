import { h } from 'hyperapp';

export default ({ state: { year, lang, langs }, actions: { changeLang } }) => {
  const handleClick = l => (e) => { changeLang(l); e.preventDefault(); };
  const link = ([l, t]) => (<li><a href="#" class={lang === l ? 'active' : ''} onclick={handleClick(l)}>{t}</a></li>);
  return (
    <footer>
      <p>
        Copyright © 2002 ~ {year} Willin Wang &nbsp;
        <ul>
          {langs.map(x => link(x))}
        </ul>
      </p>
      <p>
        <small>Written in Hyperapp with ❤️, all scripts bundled in below <strong>30KB</strong>.</small>
      </p>
    </footer>
  );
};
