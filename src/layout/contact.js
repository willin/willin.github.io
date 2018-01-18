import { h } from 'hyperapp';
import { social, others } from '../config';

export default ({ state: { i18n } }) => (
  <article id="contact" class="hidden">
    <div class="bg"></div>
    <section>
      <h3><span>{i18n.contact}</span></h3>
      <ul>
        <li>E-Mail: willin@willin.org</li>
        <li>QQ/Wechat: 2539929</li>
        <li>Mobile:  (+86)155-7797-4423</li>
        <li>Blog: <a href="https://sh.gg/" target="_blank">sh.gg</a></li>
      </ul>
      <h3><span>{i18n.works}</span></h3>
      <ul>
        {others.map(([title, user, link]) => (
          <li>
            {title}: <a href={link} target="_blank">{user}</a>
          </li>
        ))}
      </ul>
    </section>
    <aside>
      <h3><span>{i18n.social}</span></h3>
      <ul>
        {social.map(([title, user, link]) => (
          <li>
            {title}: <a href={link} target="_blank">{user}</a>
          </li>
        ))}
      </ul>
    </aside>
  </article>
);
