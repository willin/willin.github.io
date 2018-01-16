import store from '../store';
import i18n from '../i18n';
import { router } from '../utils';

export default {
  changeLang: lang => () => {
    store.save('lang', lang);
    return {
      lang,
      i18n: i18n(lang)
    };
  },
  setRoute: route => () => ({ route }),
  setView: () => (_, actions) => {
    const route = router();
    actions.setRoute(route);
    const items = document.getElementsByClassName('hidden');
    for (let i = 0; i < items.length; i += 1) {
      // eslint-disable-next-line no-param-reassign
      items[i].style.maxHeight = '0px';
    }
    const view = document.getElementById(route);
    view.style.maxHeight = `${view.scrollHeight}px`;
  }
};
