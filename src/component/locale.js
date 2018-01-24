import { h } from 'hyperapp';
import { locales } from '../config';

const handleClick = (setLocale, locale) => (e) => { setLocale(locale); e.preventDefault(); };

module.exports = ({ state: { locale }, actions: { setLocale } }) => (
  <ul>
    {locales.map(([displayLocale, displayName]) => (
      <li>
        <a href="#" class={locale === displayLocale ? 'active' : ''} onclick={handleClick(setLocale, displayLocale)}>{displayName}</a>
      </li>
    ))}
  </ul>
);
