import { h } from 'hyperapp';
import WProfile from './profile';
import WResume from './resume';
import WPortfilio from './portfilio';
import WContact from './contact';
import WLinkTab from '../component/link_tab';

export default ({ state, actions }) => (
  <main>
    <WProfile state={state} actions={actions} />
    <nav>
      <ul>
        {[['profile', 'user_info'], ['resume', 'suitcase'], ['portfilio', 'bulb'], ['contact', 'link']].map(x => (
          <WLinkTab state={state} props={x}/>
        ))}
      </ul>
    </nav>
    <WResume state={state} actions={actions} />
    <WPortfilio state={state} actions={actions} />
    <WContact state={state} actions={actions} />
  </main>
);
