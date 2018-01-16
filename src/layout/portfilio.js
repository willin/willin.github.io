import { h } from 'hyperapp';

export default ({ state }) => (
  <article id="portfilio" style={{ display: state.route === 'portfilio' ? 'block' : 'none' }}>
    Portfilio
  </article>
);
