
const PREFIX = 'w-';

exports.fetch = key => localStorage.getItem(PREFIX + key) || '';

exports.save = (key, val) => localStorage.setItem(PREFIX + key, val);
