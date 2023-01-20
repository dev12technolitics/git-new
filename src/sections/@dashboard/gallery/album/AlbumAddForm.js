import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
//components
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FormProvider,
  RHFTextField, RHFUploadMultiFile
} from '../../../../components/hook-form';
import { postgallery, putgallery } from '../../../../redux/slices/gallery';
import { useDispatch, useSelector } from '../../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function AlbumAddForm({ isEdit, id, GalleryData }) {
  const { push } = useRouter();

  const [isLoading, setisLoading] = useState(false);

  const dispatch = useDispatch();

  const { addgallery } = useSelector((state) => state.gallery);

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
    images: Yup.array().min(1, 'Images is required'),
  });

  const defaultValues = {
    title: GalleryData?.title ? GalleryData?.title : '',
    images: GalleryData?.images || [],
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
    if (isEdit && GalleryData) {
      reset(defaultValues);
      setFilterStartDate(GalleryData?.date);
    } else {
      reset(defaultValues);
    }
  }, [isEdit, GalleryData]);

  const values = watch();

  const onSubmit = async (data) => {
    setisLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      let formData = new FormData();
      formData.set('title', data.title);
      formData.set('date', filterStartDate);
      if (isEdit) {
        const imgArr = [];
        if (data.images.length > 0) {
          data.images.forEach((file) => {
            if (file.path) {

              formData.append('images', file);
               
            } else {
              imgArr.push(file);
            }
          });
        }
        formData.set('imgArr', imgArr);
      } else {

        if (data.images[0].path) {
          data.images.forEach((file) => {
            formData.append('images', file);
          });
        } else {
          formData.set('images', JSON.stringify(data.images));


        }
      }

      if (isEdit) {
        dispatch(putgallery(id, formData, toast, push, reset));
      } else {
        dispatch(postgallery(formData, toast, push, reset));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDroptwo = useCallback(
    (acceptedFiles) => {
      const images = values.images || [];

      setValue('images', [
        ...images,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
    [setValue, values.images]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Title" />

                <div>
                  <LabelStyle>Album Image</LabelStyle>

                  <RHFUploadMultiFile
                    showPreview
                    name="images"
                    maxSize={5145728}
                    onDrop={handleDroptwo}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    onUpload={() => console.log('ON UPLOAD')}
                  />

                </div>

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
                    {isEdit ? 'Update Now' : 'Post Now'}
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
