const PREFIX = 'w-';

export default {
  fetch: key => localStorage.getItem(PREFIX + key),
  save: (key, val) => localStorage.setItem(PREFIX + key, val)
};

