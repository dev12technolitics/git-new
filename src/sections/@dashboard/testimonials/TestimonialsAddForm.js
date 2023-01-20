import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from '../../../redux/store';
import { putTestimonials, postTestimonials } from '../../../redux/slices/testimonial';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const review = [
  { label: '1 Start' },
  { label: '2 Start' },
  { label: '3 Start' },
  { label: '4 Start' },
  { label: '5 Start' },
]

export default function TestimonialsAddForm({ isEdit = false, currentUser, id, testimonialsData }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, addTestimonial } = useSelector((state) => state.testimonial);

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    test_name: Yup.string().required('Name is required'),
    test_youtube_link: Yup.string().url('Youtube Video link must be a valid URL'),
    test_rewiew: Yup.string().required('Review is required'),
  });

  const defaultValues = {
    test_name: testimonialsData?.test_name || '',
    test_comment: testimonialsData?.test_comment || '',
    test_picture: testimonialsData?.test_picture || '',
    test_rewiew: testimonialsData?.test_rewiew || '',
    test_youtube_link: testimonialsData?.test_youtube_link || '',
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
    if (isEdit && testimonialsData) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, testimonialsData]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let formData = new FormData();
      formData.append('test_picture', data.test_picture);
      formData.set('test_name', data.test_name);
      formData.set('test_comment', data.test_comment);
      formData.set('test_rewiew', data.test_rewiew);
      formData.set('test_youtube_link', data.test_youtube_link);
      isEdit ? dispatch(putTestimonials(id, formData, toast)) : dispatch(postTestimonials(formData, toast));
      reset();
      addTestimonial && push('/dashboard/testimonials');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'test_picture',
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
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>

            <Box sx={{ mb: 4 }}>
              <RHFUploadAvatar
                name="test_picture"
                accept="image/*"
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  ><Box sx={{ mb: 0 }}>Testimonials Image</Box>
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <RHFTextField name="test_name" label="Name" />
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFSelect name="test_rewiew" label="Review">
                  <option value="" />
                  {review.map((option, index) => (
                    <option key={index} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </RHFSelect>

              </Grid>

              <Grid item xs={12} md={6} lg={12}>
                <RHFTextField name="test_youtube_link" label="Youtube Link" />
              </Grid>

              <Grid item xs={12} md={12}>
                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor simple name="test_comment" />
                </div>

              </Grid>
            </Grid>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {isEdit ? 'Update Now' : 'Post Now'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
