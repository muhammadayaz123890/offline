import { Box, Typography } from '@mui/material';
import React, { Fragment, useEffect, useMemo, useState, useContext } from 'react';
import { useFormContext, useFieldArray, useForm, FormProvider } from 'react-hook-form';
import TemplateFormItem from './TemplateFormItem';
import { useHookForm, HookFormProvider, useHookFormContext } from 'mui-react-hook-form-plus';
import { getTask } from '../../config/dataService/requests';
const FieldList = ({ depth, formParentName, data }) => {
  const methods = useHookFormContext();

  // console.log("methods", data);

  const { control, register, watch, setValue } = methods;

  const fieldArray = useFieldArray({
    control,
    name: formParentName,
  });
  // FiledArray is CUSTOM FIELD

  let vals = methods.watch();
  useEffect(() => {
    console.log(vals);
  }, [vals]);

  return (
    <Box>
      <Typography
        variant="h6"
        padding={1}
        backgroundColor="#ebedef"
        border={1}
        borderColor="black"
        color="black"
        textAlign="center"
        borderRadius={1}
      >
        Custom Fields
      </Typography>
      <br />
      {fieldArray.fields.map((field, index) => (
        <TemplateFormItem
          key={field.id}
          depth={depth}
          index={index}
          formParentName={formParentName}
          fieldName={field.field_name}
          agentCanAccess={field.agent_can}
          fieldType={field.field_type}
          isRequired={field.is_mandatory === 'mandatory'}
          // Field_value is contain different values e.g. for dropdown it contain options, for checkbox it contain options...
          fieldValue={field.field_value}
          fleetData={field.fleet_data}
          isLastItem={fieldArray.fields.length === index + 1}
          field={field}
        />
      ))}
      <br />
      <br />
    </Box>
  );
};
export default FieldList;
