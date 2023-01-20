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
import useAuth from '../../../../src/hooks/useAuth';
import {
    FormProvider,
    RHFTextField,
    RHFUploadSingleFile
} from '../../../components/hook-form';
import { postShop, putShop } from '../../../redux/slices/shop';
import { useDispatch, useSelector } from '../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));

export default function ShopAddForm({ isEdit = false, id, shopData }) {

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth()

    const { push } = useRouter();
    const dispatch = useDispatch();

    const { addshop } = useSelector((state) => state.shop);

    const NewStoreSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        backlink: Yup.string().url().required("Back Link is required"),
        // image: Yup.mixed().test('required', 'Image is required', (value) => value !== ''),
    });

    const defaultValues = {
        title: shopData?.title || '',
        backlink: shopData?.backlink || '',
        image: shopData?.image ? shopData?.image : '',
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
        if (isEdit && shopData) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
    }, [isEdit, shopData]);

    const values = watch();

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log("Data", data.image)
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const formData = new FormData();
            if(data.image.path){
                formData.append('image', data.image);
            }else{
                formData.set('image', data.image);
            }
            formData.set('backlink', data.backlink);
            formData.set('title', data.title);
            isEdit ? dispatch(putShop(id, formData, toast, push, reset, setIsLoading)) : dispatch(postShop(formData, toast, push, reset, setIsLoading));
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
                                <RHFTextField name="title" label="Title" />

                                <RHFTextField name="backlink" label="Back Link" />
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
