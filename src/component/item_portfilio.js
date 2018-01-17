import { h } from 'hyperapp';

export default ({
  props: {
    title, year, type, link = '', desc = ''
  }
}) => (
  <li>
    <h4>{title} <span>{year}</span></h4>
    <h5>{type}（<a href={link} target="_blank">{link}</a>）</h5>
    {desc !== '' ? (
      <p>{desc}</p>
    ) : ''}
  </li>
);

