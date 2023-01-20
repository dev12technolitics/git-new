import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, TextField, Typography, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { postBanners, putBanners } from '../../../redux/slices/banner';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//components
import {
  RHFSwitch,
  RHFEditor,
  RHFSelect,
  FormProvider,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../components/hook-form';
//
import BannerNewPostPreview from './BannerNewPostPreview';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function BannerAddForm({ isEdit = false, id, bannerData }) {

  const { push } = useRouter();
  const dispatch = useDispatch();

  const { addbanner } = useSelector((state) => state.banner);
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
    ban_title: Yup.string().required('Title is required'),
    ban_image: Yup.mixed().test('required', 'Banner image is required', (value) => value !== ''),
    ban_type: Yup.string().required('Banner type is required'),
    pro_link: Yup.string().url('Banner link must be a valid URL').required('Banner link is required'),
  });

  const defaultValues = {
    ban_title: bannerData?.ban_title ? bannerData?.ban_title : '',
    ban_type: bannerData?.ban_type ? bannerData?.ban_type : '',
    ban_image: bannerData?.ban_image ? bannerData?.ban_image : '',
    pro_link: bannerData?.pro_link ? bannerData?.pro_link : '',
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
    if (isEdit && bannerData) {
      reset(defaultValues);
      setValue("ban_type", bannerData?.ban_type)
      setBannerFor(bannerData?.ban_type);
    }
    if (!isEdit) {
      reset(defaultValues);
      setBannerFor(bannerData?.ban_type);
    }
  }, [isEdit, bannerData]);

  const values = watch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let formData = new FormData();
      formData.append('ban_image', data.ban_image);
      formData.set('ban_title', data.ban_title);
      formData.set('ban_type', bannerFor );
      formData.set('pro_link', data.pro_link);
      isEdit ? dispatch(putBanners(id, formData, toast, push, setIsLoading)) : dispatch(postBanners(formData, toast, push, setIsLoading));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'ban_image',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSetBannerFor = (value) => {
    setBannerFor(value);
    setValue("ban_type", value)
  }

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="ban_title" label="Banner title" />


                <div>
                  <LabelStyle>Banner Type</LabelStyle>
                  <RHFSelect
                    name="ban_type"
                    value={bannerFor}
                    onChange={(e) => onSetBannerFor(e.target.value)}
                  >
                    <option
                      value="">Select</option>
                    <option value="Popup Banner">Popup Banner</option>
                  </RHFSelect>
                </div>


                {/* <RHFSelect name="ban_type" label="Banner Type">
                  <option value="" />
                </RHFSelect> */}

                <RHFTextField name="pro_link" label="Back Link" />

                <div>
                  <LabelStyle>Banner Image</LabelStyle>
                  <RHFUploadSingleFile name="ban_image" accept="image/*" maxSize={3145728} onDrop={handleDrop} />
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

      <BannerNewPostPreview
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
