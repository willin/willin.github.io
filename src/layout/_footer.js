import { h } from 'hyperapp';
import WLinkLang from '../component/link_lang';

export default ({ state: { year, lang, langs }, actions: { changeLang } }) => (
    <footer>
      <p>
        Copyright © 2002 ~ {year} Willin Wang &nbsp;
        <ul>
        {langs.map(x => (
          <WLinkLang state={{ lang }} actions={{ changeLang }} props={x}/>
          ))}
        </ul>
      </p>
      <p>
        <small>Written in Hyperapp with ❤️, all scripts bundled in below <strong>30KB</strong>.</small>
      </p>
    </footer>
);
