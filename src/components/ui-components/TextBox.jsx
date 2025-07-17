"use client"
import { useState } from "react";
import classes from'./textBox.module.css'

export default function Textbox({
  label,
  required = false,
  className = "",
  id,
  type = "text",
  maxLength = 500,
  showCounter = false,
  value,
  onChange,
  ...props
}) {
  const [internalValue, setInternalValue] = useState("");
  const inputId = id || `textbox-${Math.random().toString(36).substr(2, 9)}`;

  const isTextarea = type === "textarea";
  const currentValue = value !== undefined ? value : internalValue;
  const charCount = currentValue ? currentValue.length : 0;
  const isNearLimit = charCount > maxLength * 0.8;
  const isOverLimit = charCount > maxLength;

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(newValue);
    }
  };

  const InputComponent = isTextarea ? "textarea" : "input";

  return (
    <div className={`${classes.textboxContainer} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={classes.textboxLabel}>
          {label}
          {required && <span className={classes.requiredAsterisk}>*</span>}
        </label>
      )}
      <InputComponent
        id={inputId}
        className={`${classes.textboxInput} ${isTextarea ? classes.textboxTextarea : ""}`}
        value={currentValue}
        onChange={handleChange}
        maxLength={isTextarea ? maxLength : undefined}
        {...(isTextarea ? {} : { type })}
        {...props}
      />
      {isTextarea && showCounter && (
        <div className={classes.characterCounter}>
          <span
            className={`${classes.counter} ${
              isOverLimit ? classes.overLimit : isNearLimit ? classes.nearLimit : ""
            }`}
          >
            {charCount}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
}
