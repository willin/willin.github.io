import { fetch } from '../store';
import { getLang } from '../actions/helper';

module.exports = {
  locale: fetch('locale') || getLang(),
  route: window.location.pathname
};
