import { h } from 'hyperapp';
import WFooter from './_footer';
import WHeader from './_header';
import WMain from './_main';

export default (state, actions) => (
  <div id="container">
    <WHeader show={state.showHeader} i18n={state.i18n} />
    <WMain />
    <WFooter state={state} actions={actions} />
  </div>
);
