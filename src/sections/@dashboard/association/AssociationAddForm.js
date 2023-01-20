import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FormProvider, RHFSelect, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import { postAssociation, putAssociation } from '../../../redux/slices/association';
import { getcityStatus } from '../../../redux/slices/city';
import { useDispatch, useSelector } from '../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function ShopAddForm({ isEdit = false, id, AssociationData }) {
  const [isLoading, setIsLoading] = useState(false);
  const userId = window.localStorage.getItem('userId');

  const { push } = useRouter();
  const dispatch = useDispatch();

  const { citystatusall } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(getcityStatus());
  }, [dispatch]);

  const NewStoreSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    city: Yup.string().required('City is required'),
  });

  const defaultValues = {
    name: AssociationData?.name || '',
    image: AssociationData?.image || '',
    city: AssociationData?.city || '',
  };

  const methods = useForm({
    resolver: yupResolver(NewStoreSchema),
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
    if (isEdit && AssociationData) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, AssociationData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const formData = new FormData();

      if (data.image.path) {
        formData.append('image', data.image);
      } else {
        formData.set('image', data.image);
      }
      
      formData.set('name', data.name);
      formData.set('city', data.city);
      formData.set('created_by', userId);
      isEdit
        ? dispatch(putAssociation(id, formData, toast, push, reset, setIsLoading))
        : dispatch(postAssociation(formData, toast, push, reset, setIsLoading));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="name" label="Name" />

                <RHFSelect name="city" label="Select City">
                  <option value="">Select City</option>
                  {citystatusall?.map((option, index) => (
                    <option key={index} value={option?._id}>
                      {option.city_name}
                    </option>
                  ))}
                </RHFSelect>

                <div>
                  <LabelStyle>Image</LabelStyle>
                  <RHFUploadSingleFile name="image" accept="image/*" onDrop={handleDrop} />
                </div>
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
              <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                {isEdit ? 'Update Now' : 'Post Now'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
