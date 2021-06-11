import React from "react";
import { Field, useFormikContext } from "formik";
import ErrorMessage from "./styled/ErrorMessage";
import { Box } from "../styled";
import RadioLabel from "./styled/RadioLabel";

const FormRadioField = ({ name, placeholder, value }) => {
  const { errors, touched } = useFormikContext();
  return (
    <Box marginBottom="md">
      <RadioLabel htmlFor={name}>
        <Field
          id={name}
          name={name}
          value={value}
          data-cy={`${name}Input`}
          fontSize="lg"
          type="radio"
          fluid
        />
        {placeholder}
      </RadioLabel>
      {errors[name] && touched[name] && (
        <ErrorMessage data-cy={`${name}ErrorMessage`}>{errors[name]}</ErrorMessage>
      )}
    </Box>
  );
};

export default FormRadioField;
