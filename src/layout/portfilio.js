import { h } from 'hyperapp';
import WItemPortfilio from '../component/item_portfilio';
import { portfilios, opensource } from '../config';

export default ({ state: { i18n } }) => (
  <article id="portfilio" class="hidden">
    <div class="bg"></div>
    <section>
      <h3><span>{i18n.publication}</span></h3>
      <ul class="timeline">
        {portfilios.map(item => (
          <WItemPortfilio props={Object.assign({}, item, {
            title: i18n[item.title],
            type: i18n[item.type]
          })}/>
        ))}
        <li>
          {i18n.more}: <a href="https://js.cool/">https://js.cool/</a>
        </li>
      </ul>
    </section>
    <section>
      <h3><span>{i18n.opensource}</span></h3>
      <ul class="timeline">
        {opensource.map(item => (
          <WItemPortfilio props={Object.assign({}, item, {
            title: i18n[item.title] || item.title,
            type: i18n[item.type],
            desc: i18n[`${item.title}_desc`] || ''
          })}/>
        ))}
        <li>
          {i18n.more}: <a href="https://git.willin.wang/">https://git.willin.wang/</a>
        </li>
      </ul>
    </section>
  </article>
);
