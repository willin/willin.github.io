import { h } from 'hyperapp';
import LinkLocale from './locale';

module.exports = ({ state, actions }) => (
    <footer>
      <p>
        Copyright © 2002 ~ {(new Date()).getFullYear()} Willin Wang &nbsp;
        <LinkLocale state={state} actions={actions} />
      </p>
      <p>
        <small>Written in Hyperapp with ❤️, all scripts bundled in below <strong>50KB</strong>.</small>
      </p>
    </footer>
);
