import PropTypes from 'prop-types';
import { useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Card, Stack, Grid, Divider, Checkbox, MenuItem, IconButton, CardHeader, FormControlLabel } from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import MenuPopover from '../../../components/MenuPopover';

// ----------------------------------------------------------------------

CheckboxTaskstwo.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired,
  name: PropTypes.string,
};

export default function CheckboxTaskstwo({ title, list, name, value, func, stateVal, }) {
console.log(stateVal,"==",func,value);
  const { control } = useForm({
    defaultValues: {
      taskCompleted: [''],
    },
  });

  return (
    <Card sx={{ width: "100%", pb:2 }}>
      <CardHeader title={title} />
      <Controller
        name="taskCompleted"
        control={control}
        render={({ field }) => {
          const onSelected = (task) =>
            field.value.includes(task) ? field.value.filter((value) => value !== task) : [...field.value, task];

          return (
            <>
              {list.map((task) => (
                <TaskItem
                  key={task.id}
                  name={task.name}
                  value={field.value.includes(task.id)}
                  task={task}
                  checked={field.value.includes(task.id)}
                  onChange={() => field.onChange(onSelected(task.id))}
                 
                />
              ))}
            </>
          );
        }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    func: PropTypes.string,
    stateVal: PropTypes.string,
  }),
};

function TaskItem({ task, checked, onChange }) {


  return (
    <Stack
      direction="row"
      sx={{
        px: 2,
        py: 0.75,
        ...(checked && {
          color: 'text.disabled',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.label}
        name={task.name}
        value={task.value}
        sx={{ flexGrow: 1, m: 0 }}
        onClick={() => task.func(task.stateVal==false?true:false)}
      />

    </Stack>
  );
}
