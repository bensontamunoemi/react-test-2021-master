import React, { useCallback, useEffect, useMemo } from "react";
import { Formik } from "formik";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation, useLazyQuery } from "@apollo/client";
import ReactLoading from "react-loading";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";

import { updateEmployee as updateRecord } from "../../redux/employees/actionCreators";
import FormRadioField from "./FormRadioField";
import { UPDATE_EMPLOYEE } from "../../apollo/mutations";
import { GET_EMPLOYEE } from "../../apollo/queries";

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const [fetchEmployee, { loading: fetchingData, data: employee }] = useLazyQuery(GET_EMPLOYEE);

  const [updateEmployee, { loading: isSaving }] = useMutation(UPDATE_EMPLOYEE, {
    update: ({ data }) => {
      console.log(" SUCCESS", data);
      // dispatch(saveNewEmployee(employee));
    },
    onCompleted: data => {
      console.log("COMPLETE", data);
      dispatch(updateRecord(data.updateEmployee));
      toast.success("✔️Employee updated", { position: "top-center" });
      history.push("/view");
    },
    onError: err => {
      console.log("FAILDED ", err.message);
      toast.error(`❎${err.message}`, { position: "top-center" });
    },
  });

  const submitForm = useCallback(
    employeeData => {
      console.log(employeeData);
      updateEmployee({ variables: { input: employeeData } });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchEmployee({ variables: { id } });
  }, []);

  if (fetchingData) {
    return (
      <Flex direction="column" alignItems="center" justifyContent="center" marginTop="lg">
        <ReactLoading type="balls" color="#3f78b1" height="10%" width="10%" />
        <p>Loading Employee data</p>
      </Flex>
    );
  }
  return (
    <Formik
      validationSchema={formValidationSchema}
      onSubmit={submitForm}
      initialValues={{
        _id: "",
        firstname: "",
        surname: "",
        email: "",
        age: "",
        status: "ACTIVE",
        jobTitle: "",
      }}
    >
      {function Render({ setFieldValue }) {
        useMemo(() => {
          if (employee) {
            console.log("employeesdd", employee);
            const fields = ["age", "firstname", "surname", "jobTitle", "email", "status", "_id"];
            fields.forEach(field => setFieldValue(field, employee.singleEmployee[field], false));
          }
        }, [employee]);
        return (
          <>
            <Header>Edit employee</Header>
            <Flex alignItems="center" justifyContent="center" height="100%">
              <Flex alignItems="left" direction="column" width="300px">
                <FormField name="firstname" placeholder="First name" />
                <FormField name="surname" placeholder="Surname" />
                <FormField name="email" placeholder="Email" />
                <FormField name="age" placeholder="Age" />
                <FormField name="jobTitle" placeholder="Job Title" />
                <Flex justifyContent="space-around">
                  <FormRadioField placeholder="ACTIVE" name="status" value="ACTIVE" />
                  <FormRadioField
                    placeholder="LEAVE OF ABSENCE"
                    value="LEAVE OF ABSENCE"
                    name="status"
                  />
                  <FormRadioField placeholder="TERMINATED" value="TERMINATED" name="status" />
                </Flex>
                <FormButtons disabled={isSaving} />
              </Flex>
            </Flex>
          </>
        );
      }}
    </Formik>
  );
};

export default Edit;
