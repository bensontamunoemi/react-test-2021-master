import React from "react";
import ReactLoading from "react-loading";
import DeleteBtn from "./DeleteBtn";

const Delete = ({ onDelete }) => {
  // if (isDeleting) {
  //   return <ReactLoading type="spin" color="#3f78b1" height="6%" width="6%" />;
  // }
  return (
    <DeleteBtn onClick={onDelete}>
      <i className="fas fa-trash-alt" style={{ color: "red" }} />
    </DeleteBtn>
  );
};

export default Delete;
