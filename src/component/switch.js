module.exports = (props, children) => {
  let i = 0;
  while (!children[i] && i < children.length) i += 1;
  return children[i];
};
