export default ({ app }) => {
  let originTitle = document.title;
  document.addEventListener('visibilitychange', (event) => {
    const icon = document.querySelector('[rel="shortcut icon"]') || {};
    if (event.target.hidden || event.target.webkitHidden) {
      originTitle = document.title;
      document.title = app.i18n.t('welcome');
      icon.href = '/failure.ico';
    } else {
      document.title = originTitle;
      icon.href = '/favicon.ico';
    }
  }, false);
};
