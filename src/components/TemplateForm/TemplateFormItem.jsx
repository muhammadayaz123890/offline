import { colors, Typography } from '@mui/material';
import { borderRadius, textAlign } from '@mui/system';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

// import ConditionalFieldList from "./ConditionalFieldList";
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import CustomField, { DropdownField } from './CustomField';
import { useHookForm } from 'mui-react-hook-form-plus';
export const getOptionsFromSeperatedCommaString = (str) => {
  const regexForSeperatedCommaString = /[^,\s][^\,]*[^,\s]*/g;
  return str.match(regexForSeperatedCommaString);
};

const FieldRow = ({
  depth,
  index,
  formParentName,

  fieldName, // fieldName is the name of the field in the form or LABEL
  agentCanAccess,
  fieldType,
  isRequired,
  fieldValue, //Field_value contains options "option1,option2,option3"
  fleetData,

  isLastItem,
  field,
}) => {
  const methods = useFormContext();

  const { control, register, watch, setValue, getValues } = methods;
  const formName = `${formParentName}.${index}`;
  const formNameNested = `${formName}.child_items`;
  const fieldArray = getValues(formName);

  const conditionalDropdownList = useMemo(() => {
    if (fieldType === 'conditional_dropdown' && fieldValue) {
      return getOptionsFromSeperatedCommaString(fieldValue);
    } else {
      return [];
    }
  }, [fieldType, fieldValue]);

  useEffect(() => {
    if (fieldArray.field_type === 'date') {
      setValue(
        `${formName}.fleet_data`,
        new Date(fieldArray.fleet_data)
          .toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
          .replace(/\//g, '-'),
      );
    }
  }, []);

  // console.log("conditionalDropdownList", conditionalDropdownList);
  return (
    <Fragment>
      <div
        style={{
          marginTop: 10,
          borderWidth: 3,
          borderRadius: 5,
          marginBottom: 1,
        }}
      >
        <Typography
          sx={{
            paddingTop: 1,
            paddingBottom: 1,
            backgroundColor: '#ADD8E6',
            textAlign: 'center',
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
            textTransform: 'uppercase',
          }}
        >
          {fieldName}
        </Typography>
        <CustomField
          label={fieldName}
          type={fieldType}
          isRequired={isRequired}
          name={
            fieldArray?.field_value && fieldArray?.field_value != '' && fieldType != 'checkbox'
              ? `${formName}.field_value`
              : `${formName}.fleet_data`
          }
          formName={formName}
          placeholder={fieldType}
          {...{
            agentCanAccess,
            fieldValue,
            fleetData,
          }}
        />
        {conditionalDropdownList?.length > 0 && (
          <ConditionalFieldList
            depth={depth + 1}
            name={`${formName}.fleet_data`}
            formParentName={formNameNested}
            fieldName={fieldName}
            fieldType={fieldType}
            isRequired={isRequired}
            {...{
              agentCanAccess,
              fieldValue,
              fleetData,
            }}
            options={conditionalDropdownList}
          />
        )}
      </div>
    </Fragment>
  );
};
const List = ({ depth, formParentName, isSelectedList }) => {
  const { control } = useFormContext();
  const fieldArray = useFieldArray({
    control,
    name: formParentName,
    // shouldUnregister: true,
    // keyName: formParentName
  });
  if (!isSelectedList) {
    return null;
  }
  return (
    <Fragment>
      {fieldArray.fields.map((field, index) => (
        <FieldRow
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
        />
      ))}
    </Fragment>
  );
};

const ConditionalFieldList = React.memo(
  ({
    depth,
    index,
    name,
    formParentName,

    fieldName,
    agentCanAccess,
    fieldType,
    isRequired,
    fieldValue, //Field_value contains options "option1,option2,option3"
    fleetData,
    options,
  }) => {
    const { control, watch } = useFormContext();
    const selectedOption = watch(name);
    const [selectedIndex, setIndex] = useState(() => {
      if (!!fleetData) {
        const indx = options?.findIndex((opt) => {
          return opt === fleetData;
        });
        return indx;
      } else {
        return -1;
      }
    });

    useEffect(() => {
      if (!!selectedOption) {
        const indx = options?.findIndex((opt) => {
          return opt === selectedOption;
        });
        setIndex(indx);
      }
    }, [selectedOption]);
    console.log('selectedIndex', selectedIndex, options, name);
    return (
      <Fragment>
        <DropdownField fieldValue={fieldValue} name={name} formName={formParentName} disabled={false} special={true} />
        {/* ----------------------------------------- */}
        {options !== -1 &&
          options?.map((_, fi) => (
            <List
              key={fi}
              index={fi}
              formParentName={`${formParentName}.${fi}.child_items`}
              isSelectedList={selectedIndex * 1 === fi}
              selectedIndex={selectedIndex}
              depth={depth}
            />
          ))}
      </Fragment>
    );
  },
);

export default FieldRow;
