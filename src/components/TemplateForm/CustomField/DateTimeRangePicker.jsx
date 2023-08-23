import React, { Fragment, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import { Box, Grid } from '@mui/material';
import { DateTimePicker, DateTimePickerTabs } from '@mui/x-date-pickers/DateTimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { useHookFormContext } from 'mui-react-hook-form-plus';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const CustomTabs = (props) => (
  <React.Fragment>
    <DateTimePickerTabs {...props} />
  </React.Fragment>
);

const CustomDTPicker = ({ label, value, onChange, error, helperText, disabled, ...restProps }) => {
  // const [value, setValue] = React.useState(dayjs("2022-04-07"));

  const val = useMemo(() => dayjs(value || new Date()).toISOString(), [value]);
  return (
    <DateTimePicker
      label={label}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      )}
      value={val}
      onChange={(newValue) => {
        console.log('newValue', newValue?.toISOString());
        onChange(newValue?.toISOString());
      }}
      hideTabs={false}
      components={{ Tabs: CustomTabs }}
      componentsProps={{
        tabs: {
          dateRangeIcon: <CalendarMonthIcon />,
          timeIcon: <AccessTimeIcon />,
        },
      }}
      {...restProps}
    />
  );
};
const DateTimeRangePicker = ({ startName, endName, isView }) => {
  const {
    control,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useHookFormContext();
  const startDate = watch(startName);
  const endDate = watch(endName);

  useEffect(() => {
    if (!startDate) {
      console.log('startDate', startDate);
      setValue(startName, dayjs(new Date()).toISOString());
    }
    if (!endDate) {
      const dd = dayjs(
        dayjs(startDate || new Date())
          .add(30, 'minute')
          .toDate(),
      );
      setValue(endName, dd.toISOString());
    }
  }, []);
  // useEffect(() => {
  //   if (startDate && endDate) {
  //     if (dayjs(startDate).isAfter(dayjs(endDate))) {
  //       setError(endName, {
  //         type: "manual",
  //         message: "End date must be after start date",
  //       });
  //     }
  //   }
  // }, [startDate, endDate]);
  const min = useMemo(() => dayjs(new Date()), []);
  const endMin = useMemo(() => {
    if (startDate) {
      return dayjs(dayjs(startDate).add(5, 'minute').toDate());
    }
    return min;
  }, [startDate, min]);
  return (
    <Fragment>
      <Grid item xs={6}>
        <Controller
          name={startName}
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomDTPicker label={'Start'} {...{ value, onChange }} minDateTime={min} disabled={isView} />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name={endName}
          control={control}
          render={({ field: { value, onChange } }) => (
            <CustomDTPicker
              label={'End'}
              {...{ value, onChange }}
              minDateTime={endMin}
              error={!!errors[endName]}
              helperText={errors[endName]?.message}
              disabled={isView}
            />
          )}
          rules={{
            validate: (value) => {
              console.log('validate', value);
              if (startDate && value) {
                if (dayjs(startDate).isAfter(dayjs(value))) {
                  return 'End date must be after start date!';
                }
              }
            },
          }}
        />
      </Grid>
    </Fragment>
  );
};

export default DateTimeRangePicker;
