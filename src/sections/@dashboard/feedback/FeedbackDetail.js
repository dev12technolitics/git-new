import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Button, Card, Grid, Stack, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  FormProvider, RHFTextField
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function FeedbackDetail({ FeedbackData }) {

  const { attachment, description, userId, subject, postedBy } = FeedbackData;

  const NewBlogSchema = Yup.object().shape({
  });

  const defaultValues = {
    userId: userId || '',
    description: description || '',
    subject: subject || '',
    postedBy: postedBy || ''
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting, isValid },
  } = methods;

  useEffect(() => {
    if (FeedbackData) {
      reset(defaultValues);
    } else {
      reset(defaultValues);
    }
  }, [FeedbackData]);


  return (
    <>
      <FormProvider methods={methods}>
        <ToastContainer />
        <Grid container spacing={3}>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="userId" label="user Id" inputProps={{ readOnly: true }} />

                {/* <RHFTextField name="postedBy" label="Posted By" inputProps={{ readOnly: true }} /> */}

                <RHFTextField name="subject" label="Subject" inputProps={{ readOnly: true }} />

                <Box sx={{ mt: 2 }}>
                <LabelStyle>Image</LabelStyle>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid #8885',
                      borderRight: 'none',
                      marginBottom: '15px',
                      padding: '0 0 0 12px',
                      borderRadius: 8,
                      height: 55,
                      overflow: 'hidden',
                    }}
                  >
                    <label style={{ display: 'flex' }}>
                      {attachment}
                    </label>
                    <a href={attachment} target="_blank" download={attachment} rel="noreferrer" style={{ textDecoration: 'none' }}>
                      <Button variant="contained" sx={{ height: 80 }} component="label">
                        Download
                      </Button>
                    </a>

                  </div>
                </Box>
                <div>
                  <LabelStyle>Description</LabelStyle>
                  <div style={{ border: '1px solid #8883', padding: '5px 15px', borderRadius: 8 }}>
                    {parse(`${description}`)}
                  </div>
                </div>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
