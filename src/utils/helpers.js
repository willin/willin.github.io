import { $on } from '.';

const setView = () => {
  const route = window.location.hash.split('/')[1] || '';
  console.log(route);
};

$on(window, 'load', setView);
$on(window, 'hashchange', setView);

