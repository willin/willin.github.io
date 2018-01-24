
import { h } from 'hyperapp';

module.exports = (props, children) => {
  const { to, actions } = props;
  const location = props.location || window.location;
  Object.assign(props, {
    href: to,
    actions: undefined,
    to: undefined,
    onclick: function onclick(e) {
      if (
        e.button !== 0 ||
        e.altKey ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        props.target === '_blank' ||
        e.currentTarget.origin !== location.origin
      ) {
        // eslint-disable-next-line no-empty
      } else {
        e.preventDefault();

        if (to !== location.pathname) {
          window.history.pushState(location.pathname, '', to);
        }
        actions.setRoute(to);
      }
    }
  });

  return h('a', props, children);
};
