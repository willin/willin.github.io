import { h } from 'hyperapp';

const handleClick = (changeLang, lang) => (e) => { changeLang(lang); e.preventDefault(); };

export default ({ state: { lang }, actions: { changeLang }, props: [displayLang, displayName] }) => (
  <li>
    <a href="#" class={lang === displayLang ? 'active' : ''} onclick={handleClick(changeLang, displayLang)}>{displayName}</a>
  </li>
);
