import { h } from 'hyperapp';
import WFooter from './_footer';
import WHeader from './_header';
import WMain from './_main';
import { $on } from '../utils';

export default (state, actions) => {
  $on(window, 'load', actions.setView);
  $on(window, 'hashchange', actions.setView);
  return (
    <div id="container">
      <WHeader show={state.route !== 'profile'} i18n={state.i18n} />
      <WMain state={state} actions={actions} />
      <WFooter state={state} actions={actions} />
    </div>
  );
};
