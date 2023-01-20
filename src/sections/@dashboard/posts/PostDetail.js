import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUploadMultiFile,
  RHFUploadSingleFile
} from '../../../components/hook-form';
import { getcategory, getgroupsdata } from '../../../redux/slices/groups';
import { useDispatch, useSelector } from '../../../redux/store';

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

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

const categorynames = [
  'Csr And Donations',
  'Notifications And Alerts',
  'News And Updates',
  'Blogs',
  'Upcoming Events',
  'Webinar',
];

const header = {
  'Content-Type': 'multipart/form-data',
};

export default function ProjectAddForm({ isEdit, id, postData }) {
  console.log('postData', postData);
  const [projectType, setProjectType] = useState([]);
  const [bannerFor, setBannerFor] = useState('');
  const [UserFor, setUserFor] = useState('All');
  const [categoryFor, setCategoryFor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = window.localStorage.getItem('userId');
  const [startday, setStartdate] = useState(new Date());
  const [endday, setEnddate] = useState(new Date());

  const { push } = useRouter();

  const dispatch = useDispatch();

  const { groupsalldata, categorydata } = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(getgroupsdata());
    dispatch(getcategory());
  }, [dispatch]);

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    category_id: Yup.string().required('Category is required'),
    user_type: Yup.string().required('User Type is required'),
    attachment_link: Yup.string().url('Attachment Link must be a valid URL'),
    vedio_url: Yup.string().url('Vedio Link must be a valid URL'),
    banner_video: Yup.string().url('Banner Link must be a valid URL'),
  });

  const defaultValues = {
    title: postData?.title?.length ? postData?.title : '',
    description: postData?.description ? postData?.description : '',
    images: postData?.images?.length ? postData?.images : [],
    attachment_link: postData?.attachment_link ? postData?.attachment_link : '',
    attachment_button: postData?.attachment_button ? postData?.attachment_button : '',
    start_datetime: postData?.start_datetime ? postData?.start_datetime : '',
    end_datetime: postData?.end_datetime ? postData?.end_datetime : '',
    banner_image: postData?.banner_image ? postData?.banner_image : '',
    banner_video: postData?.banner_video ? postData?.banner_video : '',
    vedio_url: postData?.vedio_url ? postData?.vedio_url : '',
    posted_by: postData?.posted_by ? postData?.posted_by : '',
    members: postData?.members ? postData?.members : [],
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
    if (isEdit && postData) {
      reset(defaultValues);

      setValue("user_type", postData?.user_type)
      setUserFor(postData?.user_type);

      setValue("banner_type", postData?.banner_type)
      setBannerFor(postData?.banner_type);

      setValue("category_id", postData?.category_id)
      setCategoryFor(postData?.category_id);

      setStartdate(postData?.start_datetime);
      setEnddate(postData?.end_datetime);
    } else {
      reset(defaultValues);
      setUserFor(postData?.user_type);
      setBannerFor(postData?.banner_type);
      setCategoryFor(postData?.category_id);
      setStartdate(postData?.start_datetime);
      setEnddate(postData?.end_datetime);
    }
  }, [isEdit, postData]);

  const values = watch();

  const handleChange = (value) => {
    setProjectType(value);
    setValue('members', value);
  };

  useEffect(() => {
    setEnddate(new Date())
    setStartdate(new Date())
    onSetUserFor("All")
  }, [])

  const onSetUserFor = (value) => { 
    setUserFor(value);
    setValue("user_type", value)
  }

  const onsetCategory = (value) => {
    setCategoryFor(value);
    setValue("category_id", value)
  }

  const onsetBanner = (value) => {
    setBannerFor(value);
    setValue("banner_type", value)
  }

  return (
    <>
      <FormProvider methods={methods} >
        <ToastContainer />

        <Grid container>
          <Grid item xs={12} md={12}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>

                    <RHFTextField name="title" label="Title" inputProps={{ readOnly: true }} />

                    <div>
                      <LabelStyle>User Type</LabelStyle>
                      <RHFSelect
                         disabled
                        name="user_type"
                        value={UserFor}
                        onChange={(e) => onSetUserFor(e.target.value)}
                      >
                        <option
                          value="All">All</option>
                        <option value="Nar Members">Nar Members</option>
                        <option value="Guest Users">Guest Users</option>
                      </RHFSelect>
                    </div>

                    {UserFor == 'Nar Members' ? (
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="demo-multiple-chip-label">Nar Members</InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={projectType}
                          onChange={(e) => handleChange(e.target.value)}
                          input={<OutlinedInput id="select-multiple-chip" label="Nar Members" />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value, index) => (
                                <Chip key={index} label={value.group_name} value={value.groupId} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {groupsalldata.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item.group_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : null}


                    <div>
                      <LabelStyle>Category</LabelStyle>
                      <RHFSelect
                         disabled
                        name="category_id"
                        value={categoryFor}
                        onChange={(e) => onsetCategory(e.target.value)}
                      >
                        <option
                          value="">Select</option>
                        {categorydata.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </RHFSelect>
                    </div>

                    {categoryFor == '636f6b66f365335b50a5dd7d' ? (
                      <>
                         <RHFTextField name="start_datetime"
                          value={moment(postData?.start_datetime).format('DD MMM YYYY, h:mm:ss a')}
                          label="Start Date/Time" inputProps={{ readOnly: true }} />

                        <RHFTextField name="end_datetime"
                          value={moment(postData?.end_datetime).format('DD MMM YYYY, h:mm:ss a')}
                          label="End Date/Time" inputProps={{ readOnly: true }} />
                      </>
                    ) : null}

                    {categoryFor == '636f6b6ff365335b50a5dd7f' ? (
                      <>
                       <RHFTextField name="start_datetime"
                          value={moment(postData?.start_datetime).format('DD MMM YYYY, h:mm:ss a')}
                          label="Start Date/Time" inputProps={{ readOnly: true }} />

                        <RHFTextField name="end_datetime"
                          value={moment(postData?.end_datetime).format('DD MMM YYYY, h:mm:ss a')}
                          label="End Date/Time" inputProps={{ readOnly: true }} />
                      </>
                    ) : null}


                    <div>
                      <LabelStyle>Banner Type</LabelStyle>
                      <RHFSelect
                         disabled
                        name="banner_type"
                        value={bannerFor}
                        onChange={(e) => onsetBanner(e.target.value)}
                      >
                        <option
                          value="">Select</option>
                        <option value="Images">Images</option>
                        <option value="video">Video</option>
                      </RHFSelect>
                    </div>

                    {bannerFor == 'video' ? <RHFTextField name="banner_video" label="Video" inputProps={{ readOnly: true }}  /> : null}

                    {bannerFor == 'Images' ? (
                       <div>
                       <LabelStyle>Banner Image</LabelStyle>
                       <RHFUploadSingleFile
                         name="banner_image"
                       />
                     </div>
                    ) : null}

                    <div>
                      <LabelStyle>Description</LabelStyle>
                      <RHFEditor simple name="description" />
                    </div>

                    <div>
                      <LabelStyle>images</LabelStyle>
                      <RHFUploadMultiFile
                        showPreview
                        name="images"
                      />
                    </div>

                    <RHFTextField name="vedio_url" label="Attach A Video" inputProps={{ readOnly: true }}  />

                    <RHFTextField name="attachment_link" label="Attachment Link" inputProps={{ readOnly: true }}  />

                    <RHFTextField name="attachment_button" label="Attachment Button Name" inputProps={{ readOnly: true }}  />
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
