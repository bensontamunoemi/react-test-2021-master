import * as actions from ".";
/* eslint-disable import/prefer-default-export */
export const saveNewEmployee = employee => dispatch => {
  console.log("redux", employee);
  dispatch(actions.saveNewEmployee(employee));
};
export const updateEmployee = employee => dispatch => {
  console.log("redux", employee);
  dispatch(actions.updateEmployee(employee));
};

export const getEmployees = employees => dispatch => {
  console.log("datasxcc", employees);
  dispatch(actions.getEmployees(employees));
};
export const deleteEmployee = employees => dispatch => {
  console.log("datasxcc", employees);
  dispatch(actions.deleteEmployee(employees.email));
};
