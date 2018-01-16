import { h } from 'hyperapp';

export default ({ state }) => (
  <article id="contact" style={{ display: state.route === 'contact' ? 'block' : 'none' }}>
    Contact
  </article>
);
