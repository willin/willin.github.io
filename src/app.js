import { app } from 'hyperapp';
import state from './state';
import actions from './actions';
import route from './route';

const main = app(state, actions, route, document.getElementById('app'));
main.setRoute(window.location.pathname);
