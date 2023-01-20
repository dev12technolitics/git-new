import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { postgroups, putgroups } from '../../../../redux/slices/groups';
import { useDispatch, useSelector } from '../../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function AddGroupForm({ isEdit, id, groupData, onCancel }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const userId = window.localStorage.getItem('userId');
  const { addcity } = useSelector((state) => state.groups);

  const [isLoading, setIsLoading] = useState(false);

  const NewBlogSchema = Yup.object().shape({
    group_name: Yup.string().required('Group Name is required'),
  });

  const defaultValues = {
    group_name: groupData?.group_name ? groupData?.group_name : '',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    if (isEdit && groupData) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, groupData]);

  const values = watch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('data', data);
    const payload = {
      name: data?.group_name,
      created_by: userId,
    };
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      isEdit
        ? dispatch(putgroups(id, payload, setIsLoading, toast, reset, push))
        : dispatch(postgroups(payload, setIsLoading, toast, reset,push));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3} sx={{ padding: '20px' }}>
              <RHFTextField name="group_name" label="Create Group Name" />
            </Stack>

            <Stack direction="row" justifyContent="end">
              <DialogActions>
                <Box sx={{ flexGrow: 1 }} />
                <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                  Post Now
                </LoadingButton>
              </DialogActions>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
