import { h } from 'hyperapp';
import WProfile from './profile';
import WResume from './resume';
import WPortfilio from './portfilio';
import WContact from './contact';
import { $on, router } from '../utils';

export default ({ state, actions }) => {
  const setView = () => {
    actions.setRoute(router());
  };
  $on(window, 'load', setView);
  $on(window, 'hashchange', setView);
  const link = ([r, i]) => (
    <li>
      <a href={`#/${r}`} class={state.route === r ? 'active' : ''}>
        <i class={`iconfont icon-${i}`} /> {state.i18n[r]}
      </a>
    </li>
  );
  return (
    <main>
      <WProfile state={state} actions={actions} />
      <nav>
        <ul>
          {[['profile', 'user_info'], ['resume', 'suitcase'], ['portfilio', 'bulb'], ['contact', 'link']].map(x => link(x))}
        </ul>
      </nav>
      <WResume state={state} actions={actions} />
      <WPortfilio state={state} actions={actions} />
      <WContact state={state} actions={actions} />
    </main>
  );
};
