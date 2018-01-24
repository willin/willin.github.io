import { h } from 'hyperapp';
import Header from '../component/_header';
import Footer from '../component/_footer';
import Tab from '../component/tab';

module.exports = ({ state, actions }, Children) => (
  <div id="container">
    <Header state={state} />
    <main>
      {state.route !== '/' ? Tab({ state, actions }) : undefined}
      {Children}
      {state.route === '/' ? Tab({ state, actions }) : undefined}
    </main>
    <Footer state={state} actions={actions} />
  </div>
);
