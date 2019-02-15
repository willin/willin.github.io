export default ({ app }) => {
  let originTitle;
  document.addEventListener('visibilitychange', (event) => {
    if (event.target.hidden || event.target.webkitHidden) {
      originTitle = document.title;
      document.title = app.i18n.t('welcome');
    } else {
      document.title = originTitle;
    }
  }, false);
};
