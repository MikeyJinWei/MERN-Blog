import React from "react";

const Alert = ({ msg }) => {
  return (
    <div className="w-full p-3 rounded-lg text-red-600 bg-red-100">{msg}</div>
  );
};

export default Alert;
