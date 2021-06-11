import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesRecords: [],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    saveNewEmployee: (draftState, action) => {
      draftState.employeesRecords.push(action.payload);
    },
    updateEmployee: (draftState, action) => {
      const index = draftState.employeesRecords.findIndex(
        obj => obj.email === action.payload.email
      );
      draftState.employeesRecords[index] = action.payload;
    },

    getEmployees: (draftState, action) => {
      draftState.employeesRecords = action.payload;
    },

    deleteEmployee: (draftState, action) => {
      draftState.employeesRecords = draftState.employeesRecords.filter(employee => {
        return employee.email !== action.payload;
      });
    },
  },
});

export const {
  saveNewEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
