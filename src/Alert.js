import React from "react";
import "./App.css";
const Alert = ({ alert }) => {
  return (
    <div>
      <p className="alert">{alert}</p>
    </div>
  );
};

export default Alert;
