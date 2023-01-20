import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { postPoll, putPoll } from '../../../redux/slices/poll';
import { useDispatch } from '../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function PollAddForm({ isEdit, id, pollData }) {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);

  const [count, setCount] = useState(0);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('your subject is required'),
  });

  const defaultValues = {
    title: pollData?.title ? pollData?.title : '',
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
    register,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    if (isEdit && pollData) {
      reset(defaultValues);
      if (pollData?.options?.length !== 0) {
        pollData?.options?.map((item, index) => {
          setIndexes((prevIndexes) => [...prevIndexes, index]);
        });
      }
    } else {
      reset(defaultValues);
    }
  }, [isEdit, pollData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const arr1 = data.options;
    const arr2 = [...new Set(indexes)].map((itemY) => {
      return itemY;
    });
    let result = arr1.filter((itemX, index) => arr2.includes(index));
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const payload = {
        title: data.title,
        options: result,
      };
      if (isEdit) {
        dispatch(putPoll(id, payload, toast, push, reset, setIsLoading));
      } else {
        dispatch(postPoll(payload, toast, push, reset, setIsLoading));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addFriend = () => {
    setCount(count + 1);
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index) => () => {
    setCount(count - 1);
    setIndexes((prevIndexes) => [...prevIndexes.filter((item) => item !== index)]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" multiline rows={3} label="Your Subject" />

                {/* 
                {indexes?.map(index => {
                  const fieldName = `options[${index}]`;
                  return (
                    <Box name={fieldName} key={fieldName}>

                      <RHFTextField name={`${fieldName}.value`}
                        label="Option" />

                      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="start">
                        <LoadingButton type="button" variant="contained" size="" onClick={removeFriend(index)}>
                          Delete
                        </LoadingButton>
                      </Stack>
                    </Box>
                  );
                })} */}

                {[...new Set(indexes)]?.map((index) => {
                  const fieldName = `options[${index}]`;
                  return (
                    <Box key={fieldName}>
                      <input
                        type="text"
                        placeholder={`Option` + index}
                        {...register(`${fieldName}.value`, {
                          value: pollData?.options[index]?.value,
                        })}
                        style={{ border: '1px solid #8885', width: '100%', borderRadius: 5, padding: '14px 12px' }}
                      />

                      <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="start">
                        <LoadingButton type="button" variant="contained" size="" onClick={removeFriend(index)}>
                          Delete
                        </LoadingButton>
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
            </Card>

            {count >= 4 ? null : (
              <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                <LoadingButton type="button" variant="contained" size="" onClick={() => addFriend()}>
                  Add More
                </LoadingButton>
              </Stack>
            )}

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
