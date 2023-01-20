import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { styled, useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { getcityStatus } from '../../../redux/slices/city';
import { postmembers } from '../../../redux/slices/members';
import { useDispatch, useSelector } from '../../../redux/store';
import axios from '../../../utils/axios';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function MembersAddForm() {
  const { push } = useRouter();

  const [projectType, setProjectType] = useState([]);

  const [designationsType, setDesignationsType] = useState([]);
  const [associationsalldata, setAssociationsalldata] = useState([]);

  const [primarySalesfor, setPrimarySales] = useState(false);
  const [secondarySalesfor, setSecondarySales] = useState(false);
  const [rentalfor, setRental] = useState(false);

  const [leasingfor, setLeasing] = useState(false);
  const [retailfor, setretail] = useState(false);
  const [salesfor, setSales] = useState(false);
  const [resalesfor, setResales] = useState(false);
  const [coworkingfor, setCoworking] = useState(false);
  const [fractionfor, setFraction] = useState(false);

  const [saleslandfor, setSalesland] = useState(false);
  const [joinDevelomentfor, setJoinDeveloment] = useState(false);
  const [jointVenturefor, setJointVenture] = useState(false);

  const [industrialwarehousingfor, setindustrialwarehousingfor] = useState(false);
  const [realEstatefor, setIndustrialRealEstate] = useState(false);

  const [propertyManagementfor, setPropertyManagement] = useState(false);

  const [dateofbirth, setDateofbirth] = useState(new Date());
  console.log('setDateofbirth', dateofbirth);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectType(typeof value === 'string' ? value.split(',') : value);
    setValue('association_id', typeof value === 'string' ? value.split(',') : value);
  };

  const getassociationsdata = async () => {
    const response = await axios.get('/association/active/all');
    setAssociationsalldata(response?.data?.group);
  };

  const onDesignationStatus = async () => {
    const response = await axios.get('/designation/active/all');
    setDesignationsType(response?.data?.designation);
  };

  const { citystatusall } = useSelector((state) => state.city);

  useEffect(() => {
    dispatch(getcityStatus());
  }, [dispatch]);

  useEffect(() => {
    getassociationsdata();
    onDesignationStatus();
  }, []);

  const defaultValues = {
    profile: '',
    name: '',
    dob: '',
    contact_no: '',
    scontact_no: '',
    email_id: '',
    city: '',
    address: '',
    association_id: [],
    designation_id: '',

    company_name: '',
    company_website: '',
    company_designation: '',
    company_email: '',
    rera_no: '',
    gst_no: '',
    company_address: '',

    residential_primary_sales: '',
    residential_secondary_sales: '',
    residential_rental: '',

    commercial_leasing: '',
    commercial_retail: '',
    commercial_sales: '',
    commercial_resales: '',
    commercial_coworking: '',
    commercial_fraction_sales: '',

    land_sales: '',
    land_join_development: '',
    land_joint_venture: '',

    industrial_real_estate: '',
    industrial_warehousing: '',
    property_management_service: '',

    password: '',
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    designation_id: Yup.string().required('Designation Name is required'),
    city: Yup.string().required('City Name is required'),
    email_id: Yup.string().email('Email must be a valid email address').required('Email is required'),
    company_email: Yup.string().email('Email must be a valid email address'),
    company_website: Yup.string().url('Company Website must be a valid URL'),
    contact_no: Yup.string()
      .required('Association Name  is required')
      .min(10, 'Password must be at least 10 characters')
      .max(10, 'Password must be at least 10 characters')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    error,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    if (projectType?.length) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        let formData = new FormData();
        formData.append('profile', data.profile);
        formData.set('password', data.password);
        formData.set('name', data.name);
        formData.set('dob', dateofbirth);
        formData.set('contact_no', data.contact_no);
        formData.set('scontact_no', data.scontact_no);
        formData.set('email_id', data.email_id);
        formData.set('city', data.city);
        formData.set('address', data.address);

        formData.set('association_id', JSON.stringify(projectType));
        formData.set('designation_id', data.designation_id);

        formData.set('company_name', data.company_name);
        formData.set('company_website', data.company_website);
        formData.set('company_designation', data.company_designation);
        formData.set('company_email', data.company_email);
        formData.set('rera_no', data.rera_no);
        formData.set('gst_no', data.gst_no);
        formData.set('company_address', data.company_address);

        formData.set('residential_primary_sales', primarySalesfor);
        formData.set('residential_secondary_sales', secondarySalesfor);
        formData.set('residential_rental', rentalfor);

        formData.set('commercial_leasing', leasingfor);
        formData.set('commercial_retail', retailfor);
        formData.set('commercial_sales', salesfor);
        formData.set('commercial_resales', resalesfor);
        formData.set('commercial_coworking', coworkingfor);
        formData.set('commercial_fraction_sales', fractionfor);

        formData.set('land_sales', saleslandfor);
        formData.set('land_join_development', joinDevelomentfor);
        formData.set('land_joint_venture', jointVenturefor);

        formData.set('industrial_real_estate', industrialwarehousingfor);
        formData.set('industrial_warehousing', industrialwarehousingfor);
        formData.set('property_management_service', propertyManagementfor);
        formData.set('password', '123456');

        dispatch(postmembers(formData, toast, push, reset, setIsLoading));
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error('Please Select Association');
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'profile',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const Removeprofile = () => {
    setValue('profile', '');
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <div style={{ paddingBottom: '5px', paddingLeft: '10px' }}>
              <LabelStyle sx={{ fontSize: '0.975rem' }}>Personal Details</LabelStyle>
            </div>
            <Card sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 1, mt: 5 }}>
                    <RHFUploadAvatar
                      name="profile"
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
                          <Box sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={() => Removeprofile()}>
                              Remove
                            </Button>
                          </Box>
                        </Typography>
                      }
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <RHFTextField name="name" label="Name" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <DatePicker
                          name="dob"
                          label="Date of Birth"
                          value={dateofbirth}
                          onChange={(newValue) => {
                            setDateofbirth(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="contact_no" label="Primary Contact No." type="number" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField
                          name="scontact_no"
                          label="Secondary Contact No."
                          type="text"
                          maxLength={10}
                          erorText="Please enter only 10 digits number"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="email_id" label="Email" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFSelect name="city" label="Select City">
                          <option
                            // disabled
                            value=""
                          >
                            Select City
                          </option>
                          {citystatusall?.map((option, index) => (
                            <option key={index} value={option?._id}>
                              {option.city_name}
                            </option>
                          ))}
                        </RHFSelect>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <RHFTextField name="address" label="Address" />
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <div style={{ paddingBottom: '5px', paddingLeft: '10px' }}>
              <LabelStyle sx={{ fontSize: '0.975rem' }}>Group Information</LabelStyle>
            </div>
            <Card sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <FormControl sx={{ width: '100%' }}>
                          <InputLabel id="demo-multiple-name-label">Association</InputLabel>
                          <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={projectType}
                            onChange={handleChange}
                            input={<OutlinedInput label="Association" />}
                            MenuProps={MenuProps}
                          >
                            {associationsalldata?.map((items, index) => (
                              <MenuItem
                                key={index}
                                value={items?._id}
                                style={getStyles(items?._id, projectType, theme)}
                              >
                                {items?.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFSelect name="designation_id" label="Select Nar Designation">
                          <option value={null}>Select Nar Designation</option>
                          {designationsType?.length &&
                            designationsType?.map((option, index) => (
                              <option key={index} value={option?._id}>
                                {option.designation_name}
                              </option>
                            ))}
                        </RHFSelect>
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <div style={{ paddingBottom: '5px', paddingLeft: '10px' }}>
              <LabelStyle sx={{ fontSize: '0.975rem' }}>Formal Information</LabelStyle>
            </div>

            <Card sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_name" label="Company Name" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_designation" label="Designation In Company" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_website" label="Company Website" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_email" label="Company Email Id" />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="rera_no" label="Rera No." />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="gst_no" label="GST No." />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_address" label="Company Address" />
                      </Grid>
                    </Grid>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <div style={{ paddingBottom: '5px', paddingLeft: '10px' }}>
              <LabelStyle sx={{ fontSize: '0.975rem' }}>Core Competencies</LabelStyle>
            </div>

            <Card sx={{ p: 3, mb: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3}>
                        <div className="">
                          <div className="form-group">
                            <h3>Commercial</h3>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="commercial_leasing"
                              checked={leasingfor == true ? 'checked' : ''}
                              value={leasingfor}
                              onClick={() => setLeasing(leasingfor ? false : true)}
                              name="commercial_leasing"
                            />
                            <label for="commercial_leasing">Leasing</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="commercial_retail"
                              checked={retailfor == true ? 'checked' : ''}
                              value={retailfor}
                              onClick={() => setretail(retailfor ? false : true)}
                              name="commercial_retail"
                            />
                            <label for="commercial_retail">Retail</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="commercial_sales"
                              checked={salesfor == true ? 'checked' : ''}
                              value={salesfor}
                              onClick={() => setSales(salesfor ? false : true)}
                              name="commercial_sales"
                            />
                            <label for="commercial_sales">Sales</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="commercial_resales"
                              checked={resalesfor == true ? 'checked' : ''}
                              value={resalesfor}
                              onClick={() => setResales(resalesfor ? false : true)}
                              name="commercial_resales"
                            />
                            <label for="commercial_resales">Resale</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="commercial_coworking"
                              checked={coworkingfor == true ? 'checked' : ''}
                              value={coworkingfor}
                              onClick={() => setCoworking(coworkingfor ? false : true)}
                              name="commercial_coworking"
                            />
                            <label for="commercial_coworking">Coworking</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="commercial_fraction_sales"
                              checked={fractionfor == true ? 'checked' : ''}
                              value={fractionfor}
                              onClick={() => setFraction(fractionfor ? false : true)}
                              name="commercial_fraction_sales"
                            />
                            <label for="commercial_fraction_sales">Fraction Sales</label>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <div className="">
                          <div className="form-group">
                            <h3>Residential</h3>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="residential_primary_sales"
                              checked={primarySalesfor == true ? 'checked' : ''}
                              value={primarySalesfor}
                              onClick={() => setPrimarySales(primarySalesfor ? false : true)}
                              name="residential_primary_sales"
                            />
                            <label for="residential_primary_sales">Primary Sales</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="residential_secondary_sales"
                              checked={secondarySalesfor == true ? 'checked' : ''}
                              value={secondarySalesfor}
                              onClick={() => setSecondarySales(secondarySalesfor ? false : true)}
                              name="residential_secondary_sales"
                            />
                            <label for="residential_secondary_sales">Secondary Sales</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="residential_rental"
                              checked={rentalfor == true ? 'checked' : ''}
                              value={rentalfor}
                              onClick={() => setRental(rentalfor ? false : true)}
                              name="residential_rental"
                            />
                            <label for="residential_rental">Rental</label>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <div className="">
                          <div className="form-group">
                            <h3>Land</h3>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="land_sales"
                              checked={saleslandfor == true ? 'checked' : ''}
                              value={saleslandfor}
                              onClick={() => setSalesland(saleslandfor ? false : true)}
                              name="land_sales"
                            />
                            <label for="land_sales">Sales</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="land_join_development"
                              checked={joinDevelomentfor == true ? 'checked' : ''}
                              value={joinDevelomentfor}
                              onClick={() => setJoinDeveloment(joinDevelomentfor ? false : true)}
                              name="land_join_development"
                            />
                            <label for="land_join_development">Join Develoment</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="land_joint_venture"
                              checked={jointVenturefor == true ? 'checked' : ''}
                              value={jointVenturefor}
                              onClick={() => setJointVenture(jointVenturefor ? false : true)}
                              name="land_joint_venture"
                            />
                            <label for="land_joint_venture">Joint Venture</label>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <div className="">
                          <div className="form-group">
                            <h3>Industrial</h3>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="industrial_warehousing"
                              checked={industrialwarehousingfor == true ? 'checked' : ''}
                              value={industrialwarehousingfor}
                              onClick={() => setindustrialwarehousingfor(industrialwarehousingfor ? false : true)}
                              name="industrial_warehousing"
                            />
                            <label for="industrial_warehousing">Industrial Warehousing</label>
                          </div>

                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="industrial_real_estate"
                              checked={realEstatefor == true ? 'checked' : ''}
                              value={realEstatefor}
                              onClick={() => setIndustrialRealEstate(realEstatefor ? false : true)}
                              name="industrial_real_estate"
                            />
                            <label for="industrial_real_estate">Industrial Real Estate</label>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <div className="">
                          <div className="form-group">
                            <h3>Property Management Service</h3>
                          </div>
                          <div className="form-group">
                            <input
                              type="checkbox"
                              id="property_management_service"
                              checked={propertyManagementfor == true ? 'checked' : ''}
                              value={propertyManagementfor}
                              onClick={() => setPropertyManagement(propertyManagementfor ? false : true)}
                              name="property_management_service"
                            />
                            <label for="property_management_service">Property Management Service</label>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Stack>

                  <Stack direction="row" spacing={1.5} sx={{ mt: 3 }} justifyContent="end">
                    <LoadingButton type="submit" variant="contained" size="" loading={isLoading}>
                      Add Now
                    </LoadingButton>
                  </Stack>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
