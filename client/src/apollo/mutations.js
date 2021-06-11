import { gql } from "@apollo/client";
import EMPLOYEE_DATA from "./fragments";

export const CREATE_EMPLOYEE = gql`
  mutation createEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      ...employeeData
    }
  }
  ${EMPLOYEE_DATA}
`;

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($input: UpdateEmployeeInput!) {
    updateEmployee(input: $input) {
      ...employeeData
    }
  }
  ${EMPLOYEE_DATA}
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($employeeId: ID!) {
    deleteEmployee(employeeId: $employeeId) {
      ...employeeData
    }
  }
  ${EMPLOYEE_DATA}
`;
