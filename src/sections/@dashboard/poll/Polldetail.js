import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PolldetailTable from './PolldetailTable';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useEffect, useState } from 'react';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function PollAddForm({ isEdit, id, pollData }) {
    const [namefor, setName] = useState();
  
    const NewBlogSchema = Yup.object().shape({
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
          setName(pollData.title);
          reset(defaultValues);
        }
        if (!isEdit) {
          reset(defaultValues);
        }
      }, [isEdit, pollData]);

    return (
        <>
            <FormProvider methods={methods} >
                <ToastContainer />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3}>
                            <RHFTextField name="title" multiline rows={3} label="Your Subject" inputProps={{ readOnly: true }} />
                        </Stack>
                    </Grid>
                </Grid>
                <PolldetailTable pollData={pollData}/>
            </FormProvider>
        </>
    );
}
