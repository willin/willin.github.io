import { h } from 'hyperapp';
import i18n from '../i18n';

module.exports = ({ state: { route, locale } }) => (
  <header>
    <div id="logo" style={{ opacity: route !== '' ? 1 : 0 }}>
      <h2>王之琳（Willin Wang）</h2>
      <h4>{i18n('motto', locale)}</h4>
    </div>
  </header>
);
