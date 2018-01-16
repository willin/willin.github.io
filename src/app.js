import { app } from 'hyperapp';
import state from './state';
import actions from './actions';
import layout from './layout';

app(state, actions, layout, document.getElementById('app'));
