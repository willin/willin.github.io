import store from '../store';
import i18n from '../i18n';

export default {
  changeLang: lang => () => {
    store.save('lang', lang);
    return {
      lang,
      i18n: i18n(lang)
    };
  },
  setRoute: route => () => ({ route })
};
