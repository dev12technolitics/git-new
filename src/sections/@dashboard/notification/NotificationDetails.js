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
import { Card, Grid, Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
//components
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
  RHFEditortwo,
} from '../../../components/hook-form';
import Image from '../../../components/Image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postNotifications, putNotifications } from '../../../redux/slices/notification';
import { useDispatch, useSelector } from '../../../redux/store';
import NotificationNewPostPreview from './NotificationNewPostPreview';
import parse from 'html-react-parser';
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

export default function NotificationDetails({ isEdit, id, notificationData }) {
  const { noti_title, noti_description, noti_image, noti_backlink, noti_youtube } = notificationData;
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, addnotification } = useSelector((state) => state.notification);

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
  });

  const defaultValues = {
    noti_title: noti_title || '',
    noti_description: noti_description || '',
    noti_image: noti_image || '',
    noti_backlink: noti_backlink || '',
    noti_youtube: noti_youtube || '',
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

  return (
    <>
      <FormProvider methods={methods}>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 5, px: 3, mb: 3 }}>
              <RHFSelect
                name="noti_bannertype"
                label="Banner Type"
                disabled
                value={bannerFor}
                onChange={(e) => setBannerFor(e.target.value)}
              >
                <option value={null}>Banner Type</option>
                <option value="noti_image">Browse Image</option>
                <option value="noti_youtube">Video link</option>
              </RHFSelect>
            </Card>

            {bannerFor == 'noti_image' ? (
              <Card sx={{ py: 3, px: 2 }}>
                <Image
                  alt="Notification Image"
                  src={noti_image}
                  style={{ borderRadius: '16px', objectFit: 'fill', height: '200px' }}
                />
              </Card>
            ) : null}

            {bannerFor == 'noti_youtube' ? (
              <Card sx={{ py: 5, px: 3 }}>
                <RHFTextField name="noti_youtube" label="Youtube Link" inputProps={{ readOnly: true }} />
              </Card>
            ) : null}
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="noti_title" label="Notification Title" inputProps={{ readOnly: true }} />

                <div>
                  <LabelStyle>Description</LabelStyle>
                  <div style={{ border: '1px solid #8883', padding: '5px 15px', borderRadius: 8 }}>
                    {parse(`${noti_description}`)}
                  </div>
                </div>

                <RHFTextField name="noti_backlink" label="Back Link" inputProps={{ readOnly: true }} />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
