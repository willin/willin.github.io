import { h } from 'hyperapp';

export default ({ state }) => (
  <article id="profile" style={{ display: state.route === 'profile' ? 'block' : 'none' }}>
    Profile
  </article>
);
