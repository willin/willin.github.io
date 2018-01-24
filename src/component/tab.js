import { h } from 'hyperapp';
import i18n from '../i18n';
import { routes } from '../config';
import Link from './link';

module.exports = ({ state: { locale, route }, actions }) => (
  <nav>
    <ul>
      {routes.map(([path, icon]) => (
        <li>
          <Link to={`/${path.replace('/', '')}`} class={route === `/${path.replace('/', '')}` ? 'active' : ''} actions={actions}>
            <i class={`iconfont icon-${icon}`} /> {i18n(path, locale)}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
