import React from "react";

const TableHead = ({ tableHead }) => {
  return (
    <tr>
      {tableHead.map((th, index) => (
        <th key={index}>{th}</th>
      ))}
    </tr>
  );
};

export default TableHead;
