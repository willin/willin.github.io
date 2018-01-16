import { h } from 'hyperapp';

export default ({ state: { year, lang }, actions: { changeLang } }) => {
  const handleClick = l => (e) => { changeLang(l); e.preventDefault(); };
  const link = (l, t) => (<a href="#" class={lang === l ? 'active' : ''} onclick={handleClick(l)}>{t}</a>);
  return (
    <footer>
      <p>
        Copyright © 2002 ~ {year} Willin Wang &nbsp;
        {link('cn', '简体中文')} | {link('en', 'English')}
      </p>
    </footer>
  );
};
