module.exports = (props) => {
  const match = props.path === undefined || props.path === props.state.route;
  return (
    match &&
    props.render({
      state: props.state,
      actions: props.action
    })
  );
};
