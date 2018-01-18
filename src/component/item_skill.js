import { h } from 'hyperapp';

export default ({
  props: [
    title, score
  ]
}) => (
  <li>
    <h4>{title}</h4>
    <h5>
      {new Array(10).fill(0).map((_, i) => (
          <span class={i < score ? 'circle' : 'circle disable'}></span>
      ))}
    </h5>
  </li>
);

