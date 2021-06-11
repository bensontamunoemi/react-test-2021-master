import React from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { Flex, Header } from "../styled";
import FormField from "./FormField";
import FormButtons from "./FormButtons";
import formValidationSchema from "./formValidationSchema";

import { saveNewEmployee } from "../../redux/employees/actionCreators";
import FormRadioField from "./FormRadioField";
import { CREATE_EMPLOYEE } from "../../apollo/mutations";

const Create = () => {
  const dispatch = useDispatch();

  const [creatEmployee, { loading }] = useMutation(CREATE_EMPLOYEE, {
    onCompleted: data => {
      dispatch(saveNewEmployee(data.createEmployee));
      toast.success("✔️Employee saved", { position: "top-center" });
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    },
    onError: err => {
      console.log("FAILDED ", err.message);
      toast.error(`❎${err.message}`, { position: "top-center" });
    },
  });

  const submitForm = employee => {
    creatEmployee({ variables: { input: employee } });
  };

  return (
    <>
      <Header>Create new employee</Header>
      <Formik
        validationSchema={formValidationSchema}
        onSubmit={submitForm}
        initialValues={{
          firstname: "",
          surname: "",
          email: "",
          age: "",
          status: "ACTIVE",
          jobTitle: "",
        }}
      >
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
            <FormButtons disabled={loading} />
          </Flex>
        </Flex>
      </Formik>
    </>
  );
};

export default Create;
