export const getLang = () => {
  const lang = navigator.language || 'en-US';
  // eslint-disable-next-line no-bitwise
  if (~lang.indexOf('HK') || ~lang.indexOf('TW')) return 'tw';
  // eslint-disable-next-line no-bitwise
  if (~lang.indexOf('zh') || ~lang.indexOf('CN')) return 'cn';
  return 'en';
};

export const $on = (target, type, callback, useCapture) => {
  target.addEventListener(type, callback, !!useCapture);
};

export const router = () => {
  const route = window.location.hash.split('/')[1] || 'profile';
  return ['profile', 'resume', 'portfilio', 'contact'].indexOf(route) !== -1 ? route : 'profile';
};
