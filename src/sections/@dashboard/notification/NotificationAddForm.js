import { useSnackbar } from 'notistack';
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
// routes
//components
import { FormProvider, RHFEditor, RHFSelect, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postNotifications, putNotifications } from '../../../redux/slices/notification';
import { useDispatch, useSelector } from '../../../redux/store';
import NotificationNewPostPreview from './NotificationNewPostPreview';
// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function NotificationAddForm({ isEdit, id, notificationData }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { addnotification } = useSelector((state) => state.notification);
  const [isLoading, setIsLoading] = useState(false); 
  const [open, setOpen] = useState(false);

  const [bannerFor, setBannerFor] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    noti_title: Yup.string().required('Title is required'),
    noti_backlink: Yup.string().url('Back link must be a valid URL'),
  });

  const defaultValues = {
    noti_title: notificationData?.noti_title ? notificationData?.noti_title : '',
    noti_description: notificationData?.noti_description ? notificationData?.noti_description : '',
    noti_image: notificationData?.noti_image ? notificationData?.noti_image : '',
    noti_backlink: notificationData?.noti_backlink ? notificationData?.noti_backlink : '',
    noti_youtube: notificationData?.noti_youtube ? notificationData?.noti_youtube : '',
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
    if (isEdit && notificationData) {
      reset(defaultValues);
      setBannerFor(notificationData?.noti_bannertype);
    } else {
      reset(defaultValues);
      setBannerFor(notificationData?.noti_bannertype);
    }
  }, [isEdit, notificationData]);

  const values = watch();

  const onSubmit = async (data) => {
    console.log("data",data);
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let formData = new FormData();
      formData.append('noti_image', data.noti_image || "");
      formData.set('noti_title', data.noti_title);
      formData.set('noti_bannertype', bannerFor);
      formData.set('noti_description', data.noti_description);
      formData.set('noti_backlink', data.noti_backlink);
      formData.set('noti_youtube', data.noti_youtube);
      isEdit ? dispatch(putNotifications(id, formData, toast, push, setIsLoading)) : dispatch(postNotifications(formData, toast,push, setIsLoading));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'noti_image',
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
                <RHFTextField name="noti_title" label="Notification Title" />

                <RHFSelect
                  name="noti_bannertype"
                  label="Banner Type"
                  value={bannerFor}
                  onChange={(e) => setBannerFor(e.target.value)}
                >
                  <option value={null}>Banner Type</option>
                  <option value="noti_image">Browse Image</option>
                  <option value="noti_youtube">Video link</option>
                </RHFSelect>

                {bannerFor == 'noti_image' ? (
                  <div>
                    <LabelStyle>Notification Image</LabelStyle>
                    <RHFUploadSingleFile name="noti_image" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
                  </div>
                ) : null}

                {bannerFor == 'noti_youtube' ? <RHFTextField name="noti_youtube" label="Youtube Link" /> : null}

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <RHFEditor simple name="noti_description" />
                </div>
                
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="noti_backlink" label="Back Link" />

                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                  <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                    {isEdit ? 'Update Now' : 'Post Now'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>

      <NotificationNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
