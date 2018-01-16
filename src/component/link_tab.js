import { h } from 'hyperapp';

export default ({ state, props: [route, icon] }) => (
  <li>
    <a href={`#/${route}`} class={state.route === route ? 'active' : ''}>
      <i class={`iconfont icon-${icon}`} /> {state.i18n[route]}
    </a>
  </li>
);
