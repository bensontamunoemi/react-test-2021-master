import { gql } from "@apollo/client";
import EMPLOYEE_DATA from "./fragments";

export const GET_EMPLOYEES = gql`
  query {
    allEmployees {
      ...employeeData
    }
  }
  ${EMPLOYEE_DATA}
`;

export const GET_EMPLOYEE = gql`
  query singleEmployee($id: ID) {
    singleEmployee(employeeId: $id) {
      ...employeeData
    }
  }
  ${EMPLOYEE_DATA}
`;
