import React from "react";

const ButtonInput = (props) => {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default ButtonInput;
