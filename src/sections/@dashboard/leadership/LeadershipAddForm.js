import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import Iconify from '../../../components/Iconify';
// components
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

import { postLeadership, putLeadership } from '../../../redux/slices/leadership';
import { useDispatch, useSelector } from '../../../redux/store';
import { getDesignationStatus } from '../../../redux/slices/designation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LeadershipAddForm({ isEdit = false, id, leadershipData }) {

    const [isLoading, setIsLoading] = useState(false);

    const { push } = useRouter();
    const dispatch = useDispatch();

    const { addleadership } = useSelector((state) => state.leadership);
    const { designationsallstatus } = useSelector((state) => state.designationnar);

    useEffect(() => {
        dispatch(getDesignationStatus());
    }, [dispatch]);

    const NewStoreSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        designation: Yup.string().required("Designation is required"),
        image: Yup.mixed().test('required', 'Banner image is required', (value) => value !== ''),
    });

    const defaultValues = {
        name: leadershipData?.name || '',
        image: leadershipData?.image || '',
        designation: leadershipData?.designation || ''
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
        if (isEdit && leadershipData) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, leadershipData]);

    const values = watch();

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log("data", data)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const formData = new FormData();
            formData.set('name', data.name);
            if (data.image.path) {
                formData.append('image', data.image);
            } else {
                formData.set('image', data.image);
            }
            formData.set('designation', data.designation);
            isEdit ? dispatch(putLeadership(id, formData, toast, push, reset, setIsLoading)) :
                dispatch(postLeadership(formData, toast, push, reset, setIsLoading));
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
                <Grid container spacing={3} >
                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3, mb: 2 }}>
                            <Box sx={{ mb: 1 }}>
                                <RHFUploadAvatar
                                    name="image"
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
                                        >
                                            <Box sx={{ mb: 0 }}>Profile Picture</Box>
                                            Allowed *.jpeg, *.jpg, *.png, *.gif
                                        </Typography>
                                    }
                                />
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card sx={{ p: 3, mb: 2 }}>
                            <Stack spacing={3}>
                                <RHFTextField name="name" label="Name" />

                                <RHFSelect name="designation" label="Select Designation">
                                    <option
                                        value="">Select Designation</option>
                                    {designationsallstatus.map((option, index) => (
                                        <option key={index}
                                            value={option?._id}
                                        >
                                            {option.designation_name}
                                        </option>
                                    ))} 
                                </RHFSelect>


                            </Stack>
                            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                                <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                                    Add Now
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider >
        </>
    );
}
