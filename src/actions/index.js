import { save } from '../store';

module.exports = {
  setLocale: locale => () => {
    save('locale', locale);
    return {
      locale
    };
  },
  setRoute: route => () => {
    const elm = document.querySelector('.hidden');
    if (elm) {
      elm.style.maxHeight = '0px';
    }
    setTimeout(() => {
      const view = document.querySelector('.hidden');
      view.style.maxHeight = `${view.scrollHeight}px`;
    }, 300);
    return { route };
  }
};

