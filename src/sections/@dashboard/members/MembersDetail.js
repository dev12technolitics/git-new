import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { styled, useTheme } from '@mui/material/styles';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { FormProvider, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { getcityStatus } from '../../../redux/slices/city';
import { getDesignationStatus } from '../../../redux/slices/designationnar';
import { useDispatch, useSelector } from '../../../redux/store';

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

export default function MembersAddForm({ membersData, id }) {
    const { dob } = membersData;

    console.log("membersData",membersData)
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
  const [isLoading, setIsLoading] = useState(false);

  const [designationNar, setDesignationNar] = useState('');

  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProjectType(typeof value === 'string' ? value.split(',') : value);
  };

  const getAssociationsdata = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('https://narapi.technolitics.com/api/v1/association/active/all', requestOptions)
      .then((response) => response.json())
      .then((data) => setAssociationsalldata(data?.group));
    fetch;
  };

  useEffect(() => {
    setDesignationsType(designations);
  }, [designations]);

  useEffect(() => {
    dispatch(getDesignationStatus());
    dispatch(getcityStatus());
  }, [dispatch]);

  useEffect(() => {
    getAssociationsdata();
  }, []);

  const { designations } = useSelector((state) => state.designation);
  const { citystatusall } = useSelector((state) => state.city);

  const defaultValues = {
    profile: membersData?.profile || '',
    name: membersData?.name || '',
    dob: membersData?.dob || '',
    contact_no: membersData?.contact_no || '',
    scontact_no: membersData?.scontact_no || '',
    email_id: membersData?.email_id || '',
    city: membersData?.city || '',
    address: membersData?.address || '',
    association_id: membersData?.association_id || [],
    designation_id: membersData?.designation_id || '',
    company_name: membersData?.company_name || '',
    company_website: membersData?.company_website || '',
    company_designation: membersData?.company_designation || '',
    company_email: membersData?.company_email || '',
    rera_no: membersData?.rera_no || '',
    gst_no: membersData?.gst_no || '',
    company_address: membersData?.company_address || '',
    residential_primary_sales: membersData?.company_address || '',
    residential_secondary_sales: membersData?.company_address || '',
    residential_rental: membersData?.company_address || '',
    commercial_leasing: membersData?.commercial_leasing || '',
    commercial_retail: membersData?.commercial_retail || '',
    commercial_sales: membersData?.commercial_sales || '',
    commercial_resales: membersData?.commercial_resales || '',
    commercial_coworking: membersData?.commercial_coworking || '',
    commercial_fraction_sales: membersData?.commercial_fraction_sales || '',
    land_sales: membersData?.land_sales || '',
    land_join_development: membersData?.land_join_development || '',
    land_joint_venture: membersData?.land_joint_venture || '',
    industrial_real_estate: membersData?.industrial_real_estate || '',
    industrial_warehousing: membersData?.industrial_warehousing || '',
    property_management_service: membersData?.property_management_service || '',
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
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (membersData) {
      reset(defaultValues);
      setValue('designation_id', membersData?.designation_id);
      setDesignationNar(membersData?.designation_id);
      setValue('association_id', membersData?.association);
      setProjectType(membersData?.association);
      setPrimarySales(membersData.residential_primary_sales);
      setSecondarySales(membersData.residential_secondary_sales);
      setRental(membersData.residential_rental);
      setLeasing(membersData.commercial_leasing);
      setretail(membersData.commercial_retail);
      setSales(membersData.commercial_sales);
      setResales(membersData.commercial_resales);
      setCoworking(membersData.commercial_coworking);
      setFraction(membersData.commercial_fraction_sales);
      setSalesland(membersData.land_sales);
      setJoinDeveloment(membersData.land_join_development);
      setJointVenture(membersData.land_joint_venture);
      setindustrialwarehousingfor(membersData.industrial_warehousing);
      setIndustrialRealEstate(membersData.industrial_real_estate);
      setPropertyManagement(membersData.property_management_service);
      setDateofbirth(membersData.dob);
    }
  }, [membersData]);

  const onSetDesignationFor = (value) => {
    setDesignationNar(value);
    setValue('designation_id', value);
  };

  return (
    <>
      <FormProvider methods={methods} >
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
                        </Typography>
                      }
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Stack spacing={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <RHFTextField name="name" label="Name" inputProps={{ readOnly: true }}  />
                      </Grid>

                      <Grid item xs={12} md={6}>
                      <RHFTextField name="dob" value={moment(dob).format('DD MMM YYYY')} label="Date of Birth" inputProps={{ readOnly: true }}  />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="contact_no" label="Primary Contact No."  inputProps={{ readOnly: true }}  />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="scontact_no" label="Secondary Contact No."  inputProps={{ readOnly: true }}  />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="email_id" label="Email"  inputProps={{ readOnly: true }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFSelect name="city" label="Select City" disabled>
                          <option value="">Select City</option>
                          {citystatusall?.map((option, index) => (
                            <option key={index} value={option?._id}>
                              {option.city_name}
                            </option>
                          ))}
                        </RHFSelect>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <RHFTextField name="address" label="Address"  inputProps={{ readOnly: true }} />
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
                      {associationsalldata?.length ? (
                        <Grid item xs={12} md={6}>
                          <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-multiple-name-label">Association</InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              multiple
                              disabled
                              value={projectType}
                              onChange={handleChange}
                              input={<OutlinedInput label="Association" />}
                              MenuProps={MenuProps}
                            >
                              {associationsalldata.map((items, index) => (
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
                      ) : null}

                      <Grid item xs={12} md={6}>
                        <RHFSelect
                          name="designation_id"
                          disabled
                          label="Select Nar Designation"
                          value={designationNar}
                          onChange={(e) => onSetDesignationFor(e.target.value)}
                        >
                          <option value="">Select Nar Designation</option>
                          {designationsType.map((option, index) => (
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
                        <RHFTextField name="company_name" label="Company Name"  inputProps={{ readOnly: true }}  />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_designation" label="Designation In Company"  inputProps={{ readOnly: true }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_website" label="Company Website"  inputProps={{ readOnly: true }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_email" label="Company Email Id"  inputProps={{ readOnly: true }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="rera_no" label="Rera No."  inputProps={{ readOnly: true }}  />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="gst_no" label="GST No."  inputProps={{ readOnly: true }} />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <RHFTextField name="company_address" label="Company Address"  inputProps={{ readOnly: true }} />
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                            disabled
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
                              disabled
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
                              disabled
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
                              disabled
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
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
