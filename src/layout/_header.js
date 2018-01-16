import { h } from 'hyperapp';

export default ({ show, i18n }) => (
  <header>
    <div id="logo" style={{ opacity: show ? 1 : 0 }}>
      <h2>王之琳（Willin Wang）</h2>
      <h4>{i18n.motto}</h4>
    </div>
  </header>
);
