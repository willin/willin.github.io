import { h } from 'hyperapp';

export default ({ state }) => (
  <article id="resume" style={{ display: state.route === 'resume' ? 'block' : 'none' }}>
    Resume
  </article>
);
