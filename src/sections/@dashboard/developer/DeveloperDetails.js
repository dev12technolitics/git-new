import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import {
    FormProvider, RHFTextField,
    RHFUploadAvatar
} from '../../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
}));
 

export default function DeveloperAddForm({ id, developerData }) {

    const { name_director_name, company_name, dev_email, dev_contact, rera_certificate, dev_website } = developerData;

    const { push } = useRouter();

    const dispatch = useDispatch();

    const NewUserSchema = Yup.object().shape({
        name_director_name: Yup.string().required('Director Name is required'),
    });

    const defaultValues = {
        company_name: company_name || '',
        name_director_name: name_director_name || '',
        rera_certificate: rera_certificate || '',
        dev_email: dev_email || '',
        dev_contact: dev_contact || '',
        dev_website: dev_website || '',
    };

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        setValue,
        reset,
        formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (developerData) {
            reset(defaultValues);
        }
    }, [developerData]);

    return (
        <FormProvider methods={methods}>
           
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ py: 10, px: 3 }}>

                        <Box sx={{ mb: 4 }}>
                            <RHFUploadAvatar
                                name="rera_certificate"
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
                                    ><Box sx={{ mb: 0 }}>Rera Certificate / Authenticity Certificate</Box>
                                    </Typography>
                                }
                            />
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <RHFTextField name="company_name" label="Company Name" inputProps={{ readOnly: true }} />
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <RHFTextField name="name_director_name" label="Name of director" inputProps={{ readOnly: true }}/>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <RHFTextField name="dev_contact" label="Contact" inputProps={{ readOnly: true }} />
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <RHFTextField name="dev_email" label="Email" inputProps={{ readOnly: true }}/>
                            </Grid>

                            <Grid item xs={12} md={6} lg={12}>
                                <RHFTextField name="dev_website" label="Website" inputProps={{ readOnly: true }} />
                            </Grid>


                        </Grid>

                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
