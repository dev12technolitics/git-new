import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  FormProvider, RHFTextField
} from '../../../components/hook-form';
import { postdesignation, putdesignation } from '../../../redux/slices/designation';
import { useDispatch, useSelector } from '../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function DesignationsAddForm({ isEdit = false, id, designationData }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { adddesignation } = useSelector((state) => state.designationnar);
  const [isLoading, setIsLoading] = useState(false);

  const [designationName, setDesignationName] = useState();

  const NewUserSchema = Yup.object().shape({
    designation_name: Yup.string().required('Designation Name is required'),
  });

  const defaultValues = {
    designation_name: designationData?.designation_name || '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && designationData) {
      setDesignationName(designationData.designation_name);
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, designationData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      designation_name: data.designation_name,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      isEdit ? dispatch(putdesignation(id, payload, toast, setIsLoading)) : dispatch(postdesignation(payload, toast, setIsLoading));
      reset();
      push('/dashboard/designation');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RHFTextField name="designation_name" label="Designation Name" />
          
          <Stack alignItems="flex-start" sx={{mt:3}}>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {isEdit ? 'Update Now' : 'Post Now'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
