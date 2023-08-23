import { FIELD_TYPE_LIST, getOptionsFromSeperatedCommaString } from '../../../helpers/constants';
import React, { useEffect, useMemo, useState } from 'react';
import { HookCheckBox, HookSelect, useHookFormContext } from 'mui-react-hook-form-plus';
import { Grid, Typography } from '@mui/material';
import ImageGallery from './ImageGallery.tsx';

export const TextField = ({ name, placeholder, disabled }) => {
  const { register } = useHookFormContext();
  return (
    <input className="input_field" type="text" placeholder={placeholder} disabled={disabled} {...register(name)} />
  );
};
export const NumberField = ({ name, placeholder, disabled }) => {
  const { register } = useHookFormContext();
  return (
    <input className="input_field" type="number" placeholder={placeholder} disabled={disabled} {...register(name)} />
  );
};
export const PhoneField = ({ name, placeholder, disabled }) => {
  const { register } = useHookFormContext();
  return (
    <input
      className="input_field"
      type="tel"
      placeholder={placeholder}
      {...register(name, {
        required: false,
        pattern: /^[0-9+-]+$/,
        minLength: 6,
        maxLength: 12,
      })}
      disabled={disabled}
    />
  );
};
export const EmailField = ({ name, placeholder, disabled }) => {
  const { register } = useHookFormContext();
  return (
    <input
      className="input_field"
      type="email"
      placeholder={placeholder}
      {...register(name, { required: false, pattern: /^\S+@\S+$/i })}
      disabled={disabled}
    />
  );
};

// ONLY DATE FIELDS
export const DateField = ({ name, placeholder, disabled }) => {
  const { register } = useHookFormContext();

  return (
    <input
      className="input_field w-full"
      type="date"
      placeholder={placeholder}
      {...register(name)}
      disabled={disabled}
    />
  );
};
export const DateFutureField = ({ name, placeholder, disabled }) => {
  const { register, getValues } = useHookFormContext();
  const min = new Date().toISOString().split('T')[0];

  let date = getValues(name);

  return (
    <input
      className="input_field w-full"
      type="text"
      placeholder={placeholder}
      min={min}
      disabled={disabled}
      value={new Date(date || new Date()).toISOString().split('T')[0]}
      {...register(name)}
    />
  );
};
export const DatePastField = ({ name, placeholder, disabled }) => {
  const { register, getValues } = useHookFormContext();
  const max = new Date().toISOString().split('T')[0];
  let date = getValues(name);
  return (
    <input
      className="input_field w-full"
      type="date"
      placeholder={placeholder}
      max={max}
      disabled={disabled}
      value={new Date(date || new Date()).toISOString().split('T')[0]}
      {...register(name)}
    />
  );
};

// DATE & TIME FIELDS
export const DateTimeField = ({ name, placeholder, disabled }) => {
  const { register, getValues } = useHookFormContext();
  let date = getValues(name);
  return (
    <input
      className="input_field w-full"
      type="datetime-local"
      placeholder={placeholder}
      disabled={disabled}
      value={new Date(date || new Date()).toISOString().split('.')[0]}
      {...register(name)}
    />
  );
};
export const DateTimeFutureField = ({ name, placeholder, disabled }) => {
  const { register, getValues } = useHookFormContext();
  const min = new Date().toISOString();
  let date = getValues(name);
  return (
    <input
      className="input_field w-full"
      type="datetime-local"
      placeholder={placeholder}
      min={min}
      disabled={disabled}
      value={new Date(date || new Date()).toISOString().split('.')[0]}
      {...register(name)}
    />
  );
};
export const DateTimePastField = ({ name, placeholder, disabled }) => {
  const { register, getValues } = useHookFormContext();
  const max = new Date().toISOString();
  let date = getValues(name);
  return (
    <input
      className="input_field w-full"
      type="datetime-local"
      placeholder={placeholder}
      max={max}
      disabled={disabled}
      value={new Date(date || new Date()).toISOString().split('.')[0]}
      {...register(name)}
    />
  );
};

// IMAGE DROPDOWN

export const ImageDropdown = ({ name }) => {
  const { register } = useHookFormContext();

  return (
    <select className="select_field" {...register(name)}>
      <option value="camera_gallery">Camera and Gallery</option>
      <option value="camera">Camera Only</option>
    </select>
  );
};
export const AgentAccessDropdown = ({ name }) => {
  const { register } = useHookFormContext();

  return (
    <select className="select_field" {...register(name)}>
      <option value="read_write">Read &#38; Write</option>
      <option value="read">Read</option>
    </select>
  );
};
export const MandatoryDropdown = ({ name }) => {
  const { register } = useHookFormContext();

  return (
    <select className="select_field" {...register(name)}>
      <option value="not_mandatory">Not Mandatory</option>
      <option value="mandatory">Mandatory</option>
    </select>
  );
};
export const FieldTypeDropdown = ({ name }) => {
  const { register } = useHookFormContext();

  return (
    <select className="select_field" {...register(name)}>
      {FIELD_TYPE_LIST.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export const CheckboxField = ({ label = '', name, isRequired = false, disabled }) => {
  const { registerState } = useHookFormContext();

  return (
    <HookCheckBox
      {...registerState(name)}
      formControlLabelProps={{
        label: label,
        disabled: disabled,
      }}
      gridProps={{
        xs: 12,
      }}
    />
  );
};

export const ChecklistField = ({ label = '', name, isRequired = false, optionsStr, formName, disabled }) => {
  const { registerState, getValues, setValue } = useHookFormContext();

  const options = useMemo(() => {
    const str = getValues(name);
    return getOptionsFromSeperatedCommaString(str) || [];
  }, [name]);

  console.log('options', options);

  const answers = getValues(formName + '.fleet_data') || '';
  console.log('answers', answers);

  answers != '' &&
    answers?.forEach((answer) => {
      setValue(answer, true);
    });

  return (
    <Grid>
      {options.map((option, index) => (
        <HookCheckBox
          {...registerState(option)}
          formControlLabelProps={{
            label: option,
            value: answers.includes(option),
            disabled: disabled,
          }}
          gridProps={{
            xs: 4,
          }}
        />
      ))}
    </Grid>
  );
};

export const DropdownField = ({
  label = '',
  name,
  isRequired = false,
  optionsStr,
  formName,
  fieldValue, //Field_value contains options "option1,option2,option3"
  fleetData,
  disabled,
  special = false,
}) => {
  const { registerState, getValues, setValue } = useHookFormContext();

  // console.log("optionsString", optionsString);

  const options = useMemo(() => {
    const str = fieldValue || '';
    return getOptionsFromSeperatedCommaString(str) || ['none'];
  }, [fieldValue]);

  // setValue(name, getValues(formName + ".fleet_data"));
  let optItems = options.map((option) => ({
    label: option,
    value: option,
  }));

  useEffect(() => {
    if (!getValues(name)) {
      setValue(name, null);
    }
  }, [getValues(name)]);

  return (
    <HookSelect
      {...registerState(special ? name : formName + '.fleet_data')}
      selectProps={{
        clearable: true,
        placeholder: 'Select',
        disabled: disabled,
      }}
      items={optItems}
      gridProps={{
        xs: 6,
        md: 4,
      }}
      rules={{
        required: {
          value: true,
          message: 'Please select atleast one',
        },
      }}
    />
  );
};

export const BarcodeField = ({ label = '', name, isRequired = false, optionsStr, formName, disabled }) => {
  const { registerState, getValues, setValue } = useHookFormContext();

  const value = getValues(formName + '.fleet_data');

  return (
    <Typography pl={2} fontWeight={700} display="flex">
      scanned:{' '}
      <Typography fontWeight={400} pl={1}>
        {value}
      </Typography>
    </Typography>
  );
};

const CustomField = (props) => {
  const { type, name, placeholder, disabled, formName, ...restProps } = props;

  switch (type) {
    case 'text':
      return <TextField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'barcode':
      return <BarcodeField {...props} />;
    case 'signature':
    case 'url':
      return <TextField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'dropdown':
      return <DropdownField name={name} formName={formName} disabled={disabled} {...restProps} />;
    case 'checkbox':
      return <CheckboxField name={name} disabled={disabled} />;

    case 'checklist':
      return <ChecklistField name={name} disabled={disabled} formName={formName} />;
    case 'number':
      return <NumberField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'phone':
      return <PhoneField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'email':
      return <EmailField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'date':
      return <DateField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'date_future':
      return <DateFutureField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'date_past':
      return <DatePastField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'date_time':
      return <DateTimeField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'date_time_future':
      return <DateTimeFutureField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'date_time_past':
      return <DateTimePastField name={name} placeholder={placeholder} disabled={disabled} />;
    case 'image':
      return <ImageGallery name={name} disabled={disabled} formName={formName} />;
    case 'agent_can_access':
      return <AgentAccessDropdown name={name} placeholder={placeholder} disabled={disabled} />;
    case 'is_mandatory':
      return <MandatoryDropdown name={name} placeholder={placeholder} disabled={disabled} />;
    case 'field_type':
      return <FieldTypeDropdown name={name} placeholder={placeholder} disabled={disabled} />;
    default:
      return null;
  }
};

export default CustomField;
