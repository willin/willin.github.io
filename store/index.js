/* eslint-disable no-shadow, no-param-reassign */
export const state = () => ({
  theme: 'light',
  i18n: {
    locale: '',
    messages: {}
  }
});

export const mutations = {
  toggleTheme(state, theme = '') {
    if (typeof theme === 'string' && theme !== '') {
      state.theme = theme;
    } else {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    }
  }
};

export const actions = {
  toggleThemeByTime({ commit }) {
    const hour = new Date().getHours();
    const theme = hour < 7 || hour > 19 ? 'dark' : 'light';
    commit('toggleTheme', theme);
  },
  toggleTheme({ dispatch }) {
    dispatch('toggleTheme');
  }
};
