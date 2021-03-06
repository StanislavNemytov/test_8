import { Tag } from "antd";
import React from "react";
import "./TableTag.less";

const TableTag = ({ statusNumber }) => {
  const variantOfTag = {
    completed: { color: "green", text: "Completed" },
    edited: { color: "red", text: "Edited by Admin" },
    notCompleted: { color: "blue", text: "Not complete" },
  };
  const arrOfTags = [];
  arrOfTags.push(statusNumber % 10 ? "completed" : "notCompleted");

  if (statusNumber >= 10) {
    arrOfTags.push("edited");
  }

  return (
    <>
      {arrOfTags.map((variant) => (
        <Tag
          color={variantOfTag[variant].color}
          key={variantOfTag[variant].text}
        >
          {variantOfTag[variant].text}
        </Tag>
      ))}
    </>
  );
};

export default TableTag;
