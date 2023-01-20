import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Stack, Typography, TextField } from '@mui/material';
//components
import {
  RHFEditor,
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFUploadSingleFile,
  RHFUploadMultiFile,
} from '../../../../components/hook-form';
import { useDispatch, useSelector } from '../../../../redux/store';
import { postVideo, putVideo } from '../../../../redux/slices/video';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useLocales from '../../../../hooks/useLocales';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function VideoAddForm({ isEdit, id, onevideo }) {
  const { push } = useRouter();

  const { translate, currentLang } = useLocales();
  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const { addVideo } = useSelector((state) => state.video);

  const [open, setOpen] = useState(false);

  const [filterStartDate, setFilterStartDate] = useState(new Date());

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    youtube_link: Yup.string().url().required('Youtube Link is required'),
  });

  const defaultValues = {
    title: onevideo?.title ? onevideo?.title : '',
    youtube_link: onevideo?.youtube_link ? onevideo?.youtube_link : '',
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
    if (isEdit && onevideo) {
      reset(defaultValues);
      setFilterStartDate(onevideo?.date);
    } else {
      reset(defaultValues);
    }
  }, [isEdit, onevideo]);

  const values = watch();

  const onSubmit = async (data) => {
    setisLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const payload = {
        date: filterStartDate,
        youtube_link: data.youtube_link,
        title: data.title,
      };
      isEdit ? dispatch(putVideo(id, payload, toast, push, reset)) : dispatch(postVideo(payload, toast, push, reset));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Title" />

                <RHFTextField name="youtube_link" label="Video Link" />

                <DatePicker
                  name="date"
                  label="Date"
                  value={filterStartDate}
                  onChange={(newValue) => {
                    setFilterStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />

                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                  <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                    {isEdit ? "Update Now" : "Post Now"}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
