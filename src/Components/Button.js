function Button(props) {
  return (
    <button className={props.name} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Button;
