import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import Delete from "../Delete.js";
import { StatusSuccess, StatusTerminated, StatusLeave } from "./Status";

const columns = ({ handleDelete, isDeleting }) => [
  {
    name: "Avatar",
    selector: "image",
    cell: row => (
      <div data-tag="allowRowEvents">
        <Avatar name={`${row.firstname} ${row.surname}`} size="40" round="40px" />
      </div>
    ),
  },

  {
    name: "First Name",
    selector: "firstname",
    sortable: true,
  },
  {
    name: "Last Name",
    selector: "surname",
    sortable: true,
  },
  {
    name: "Age",
    selector: "age",
    sortable: true,
  },
  {
    name: "Email",
    selector: "email",
    sortable: true,
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
    cell: row => {
      if (row.status === "ACTIVE") {
        return <StatusSuccess>{row.status}</StatusSuccess>;
      }
      if (row.status === "TERMINATED") {
        return <StatusTerminated>{row.status}</StatusTerminated>;
      }
      return <StatusLeave>{row.status}</StatusLeave>;
    },
  },
  {
    cell: row => (
      <div data-tag="allowRowEvents">
        <Link to={`/edit/${row.employeeId}`}>
          <i className="fas fa-user-edit" />
        </Link>
      </div>
    ),
  },
  {
    cell: row => (
      <div data-tag="allowRowEvents">
        <Delete isDeleting={isDeleting} onDelete={() => handleDelete(row)} />
      </div>
    ),
  },
];

export default columns;
