import React from "react";

const InputFilter = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputFilter;
