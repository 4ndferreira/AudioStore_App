import { ChangeEvent, FocusEventHandler, JSX, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  type: string;
  children: JSX.Element;
  name: string;
  onFieldChange: (newValue: string) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  errorMessage?: string
}

export default function Input({
  id,
  type,
  children,
  name,
  onFieldChange,
  onFocus,
  error = false,
  errorMessage
}: InputProps) {
  const [value, setValue] = useState<string>("");

  const handlerValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onFieldChange(newValue);
  };

  return (
    <div className={styles.wrapper}>
      <input
        className={error && errorMessage ? `${styles.input} ${styles.error}` : styles.input}
        id={id}
        type={type}
        value={value}
        {...(type === "text"
          ? { onInput: handlerValue }
          : { onChange: handlerValue })}
        onFocus={onFocus}
        placeholder={name}
      />
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      {error && errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  );
}
