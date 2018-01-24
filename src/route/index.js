import { h } from 'hyperapp';
import Switch from '../component/switch';
import Route from '../component/route';
import Layout from './layout';
import Profile from './profile';
import Portfilio from './portfilio';
import Resume from './resume';
import Contact from './contact';
import NotFound from './404';

module.exports = (state, actions) => (
  <Layout state={state} actions={actions} >
    <Switch>
      <Route path="/" render={Profile} state={state} actions={actions} />
      <Route path="/resume" render={Resume} state={state} actions={actions} />
      <Route path="/portfilio" render={Portfilio} state={state} actions={actions} />
      <Route path="/contact" render={Contact} state={state} actions={actions} />
      <Route render={NotFound} />
    </Switch>
  </Layout>
);
