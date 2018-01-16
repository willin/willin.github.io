import { getLang } from '../utils';
import store from '../store';
import i18n from '../i18n';

const lang = store.fetch('lang') || getLang();

export default {
  year: (new Date()).getFullYear(),
  lang,
  i18n: i18n(lang),
  showHeader: true
};
