import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography,Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  FormProvider, RHFTextField, RHFUploadSingleFile
} from '../../../components/hook-form';
import { postcity, putcity } from '../../../redux/slices/city';
import { useDispatch, useSelector } from '../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CityAddForm({ isEdit = false, id, cityData }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { addcity} = useSelector((state) => state.city);
  const [isLoading, setIsLoading] = useState(false);


  const NewUserSchema = Yup.object().shape({
    city_name: Yup.string().required('City Name is required'),
  });

  const defaultValues = {
    city_name: cityData?.city_name ? cityData?.city_name : '',
    images: cityData?.image ? cityData?.image : '',
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
    if (isEdit && cityData) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, cityData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let formData = new FormData();
      formData.append('images', data.images || "");
      formData.set('city_name', data.city_name);
      isEdit ? dispatch(putcity(id, formData, toast, setIsLoading)) : dispatch(postcity(formData, toast, setIsLoading));
      reset();
      push('/dashboard/city');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'images',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Grid container spacing={3}>

        <Grid item xs={12} md={6}>
          <RHFTextField name="city_name" label="City Name" />

          <Box sx={{ mt: 2}}>
            <LabelStyle>Icon</LabelStyle>
            <RHFUploadSingleFile name="images" accept="image/*"
              maxSize={3145728} onDrop={handleDrop} />
          </Box>

          <Stack alignItems="flex-start" sx={{ mt: 3}}>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {isEdit ? 'Update Now' : 'Post Now'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
