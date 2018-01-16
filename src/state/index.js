import { getLang } from '../utils';
import store from '../store';
import i18n from '../i18n';

const lang = store.fetch('lang') || getLang();

export default {
  year: (new Date()).getFullYear(),
  lang,
  langs: [['cn', '简体中文'], ['tw', '繁體中文'], ['en', 'English']],
  i18n: i18n(lang),
  route: 'profile'
};
