import classes from "./LabelInput.module.css";

const LabelInput = (props: {
  htmlFor: string;
  element: JSX.Element;
  name: string;
}) => {
  return (
    <label className={classes.label} {...props}>
      {props.element}
      <p className={classes.labelText}>
        {props.name}
      </p>
    </label>
  );
};

export default LabelInput;
