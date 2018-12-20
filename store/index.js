/* eslint-disable no-param-reassign */
const hour = new Date().getHours();

export const state = () => ({
  theme: hour < 7 || hour > 19 ? 'dark' : 'light'
});

export const mutations = {
  toggleTheme(s) {
    s.theme = s.theme === 'dark' ? 'light' : 'dark';
  }
};

export const actions = {
  toggleTheme({ dispatch }) {
    dispatch('toggleTheme');
  }
};
