import * as yup from "yup";

const formValidationSchema = yup.object().shape({
  firstname: yup
    .string()
    .trim()
    .max(255, "The maximum number of characters is 255")
    .required("Required"),
  surname: yup
    .string()
    .trim()
    .max(255, "The maximum number of characters is 255")
    .required("Required"),
  email: yup
    .string()
    .trim()
    .max(255, "The maximum number of characters is 255")
    .email("Invalid email address")
    .required("Required"),
  age: yup
    .number()
    .min(2, "Must be a valid age with 2 numbers")
    .required("Required"),
  jobTitle: yup
    .string()
    .trim()
    .max(255, "The maximum number of characters is 255")
    .required("Required"),
});

export default formValidationSchema;
