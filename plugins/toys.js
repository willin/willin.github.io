export default () => {
  let originTitle;
  document.addEventListener('visibilitychange', (event) => {
    if (event.target.hidden || event.target.webkitHidden) {
      originTitle = document.title;
      document.title = '别走开，有惊喜！';
    } else {
      document.title = originTitle;
    }
  }, false);
};
