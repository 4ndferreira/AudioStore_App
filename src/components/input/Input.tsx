import { ChangeEvent, FocusEventHandler, useState } from "react";
import classes from "./Input.module.css";

export default function Input(props: {
  id: string;
  type: string;
  children: JSX.Element;
  name: string;
  onFieldChange: (newValue: string) => void;
  onFocus: FocusEventHandler<HTMLInputElement> | undefined;
}) {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handlerValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    props.onFieldChange(newValue);
  };

  return (
    <>
      <input
        className={classes.input}
        id={props.id}
        type={props.type}
        value={value}
        {...(props.type === "text"
          ? { onInput: handlerValue }
          : { onChange: handlerValue })}
        onFocus={props.onFocus}
        placeholder={props.name}
      />
      <label className={classes.label} htmlFor={props.id}>
        {props.children}
      </label>
    </>
  );
}
