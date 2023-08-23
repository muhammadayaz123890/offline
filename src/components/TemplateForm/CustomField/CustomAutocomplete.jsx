import React from 'react';
import { Controller } from 'react-hook-form';
import { useHookFormContext } from 'mui-react-hook-form-plus';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect } from 'react';

const CustomAutocomplete = ({
  label,
  name,
  options,
  withLabelId = true,
  onChangeCallback,
  required = false,
  isView = false,
  ...autocompleteProps
}) => {
  const { control, setValue, watch } = useHookFormContext();

  const watchValue = watch(name);

  useEffect(() => {
    console.log(options);
    let op = options.find((opt) => `${opt?.value}` === `${watchValue}`) || null;
    setValue(name + '_data', op);
  }, [watchValue, options]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        // console.log(name, "value", typeof value, "->", value);
        return (
          <Autocomplete
            disabled={isView}
            options={options}
            isOptionEqualToValue={(opt, value) => {
              return `${opt?.value}` === `${value['value']}`;
            }}
            getOptionLabel={(opt) => {
              if (withLabelId) {
                return `${opt?.label || 'N/A'}   (${opt?.value})` || '';
              }
              return `${opt?.label || 'N/A'}`;
            }}
            value={options.find((opt) => `${opt?.value}` === `${value}`) || null}
            onChange={(_, op) => {
              onChange(op?.value || '');
              setValue(name + '_data', op);
              onChangeCallback?.();
            }}
            renderInput={(params) => <TextField required={required} {...params} label={label || 'Select...'} />}
            {...autocompleteProps}
          />
        );
      }}
    />
  );
};

export default CustomAutocomplete;
