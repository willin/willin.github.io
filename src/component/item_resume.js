import { h } from 'hyperapp';

export default ({
  props: {
    title, company, from, to = '', link = '', desc = ''
  }
}) => (
  <li>
    <h4>{title} <span>{from} {to !== '' ? (<strong> - {to}</strong>) : ''}</span></h4>
    <h5>{company} <a href={link} target="_blank">{link}</a></h5>
    {desc !== '' ? (
      <p>{desc}</p>
    ) : ''}
  </li>
);

