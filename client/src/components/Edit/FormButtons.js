import React from "react";
import { useHistory } from "react-router";
import { useFormikContext } from "formik";
import { Box, Button, Flex } from "../styled";

const FormButtons = ({ disabled }) => {
  const { handleSubmit } = useFormikContext();
  const history = useHistory();

  return (
    <Flex justifyContent="center">
      <Box marginRight="sm">
        <Button data-cy="backButton" onClick={() => history.goBack()}>
          Back
        </Button>
      </Box>
      <Box>
        <Button data-cy="saveButton" disabled={disabled} onClick={handleSubmit} type="submit">
          {disabled ? "Saving Employee Data" : "Save"}
        </Button>
      </Box>
    </Flex>
  );
};

export default FormButtons;
