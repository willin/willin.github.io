import { app } from 'hyperapp';
import state from './state';
import actions from './actions';
import layout from './layout';
import './utils/helpers';

// app(state, actions, view, document.getElementById('app'));

app(state, actions, layout, document.getElementById('app'));
