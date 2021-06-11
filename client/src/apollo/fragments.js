import { gql } from "@apollo/client";

const EMPLOYEE_DATA = gql`
  fragment employeeData on Employee {
    _id
    firstname
    surname
    email
    age
    status
    jobTitle
    createdAt
    updatedAt
  }
`;

export default EMPLOYEE_DATA;
