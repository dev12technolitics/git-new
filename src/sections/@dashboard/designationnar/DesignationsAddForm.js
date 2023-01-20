import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import {
  FormProvider, RHFTextField
} from '../../../components/hook-form';

import { postdesignation, putdesignation } from '../../../redux/slices/designationnar';
import { useDispatch, useSelector } from '../../../redux/store';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function DesignationsAddForm({ isEdit = false, id, designationData }) {
  const { push } = useRouter();

  const dispatch = useDispatch();

  const { adddesignation } = useSelector((state) => state.designation);
  const [isLoading, setIsLoading] = useState(false);

  const [designationName, setDesignationName] = useState();

  const [membersManagement, setMembersManagement] = useState(false);
  const [groupsFor, setGroups] = useState(false);
  const [designationFor, setDesignation] = useState(false);
  const [pollfor, setPoll] = useState(false);
  const [merchandise, setMerchandise] = useState(false);
  const [associations, setAssociations] = useState(false);

  const [posts, setPosts] = useState(false);
  const [leadership, setLeadership] = useState(false);
  const [membershipenquiries, setMembershipEnquiries] = useState(false);
  const [feedbacks, setFeedbacks] = useState(false);
  const [gallery, setGallery] = useState(false);
  const [bannerManagement, setBanerManagement] = useState(false);
  
  const [designationfor, setDesignationfor] = useState(false);
  const [cityfor, setCity] = useState(false);

  const NewUserSchema = Yup.object().shape({
    designation_name: Yup.string().required('Designation Name is required'),
  });

  const defaultValues = {
    designation_name: designationData?.designation_name || '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
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
    if (isEdit && designationData) {
      setDesignationName(designationData.designation_name);

      setMembersManagement(designationData.members_management);
      setGroups(designationData.groups);
      setPoll(designationData.poll);
      setDesignation(designationData.designation);
      setMerchandise(designationData.mer_chandise);
      setAssociations(designationData.asso_ciations);

      setPosts(designationData.post_s);
      setLeadership(designationData.leader_ship);
      setMembershipEnquiries(designationData.membership_enquiries);
      setFeedbacks(designationData.feed_backs);
      setGallery(designationData.gall_ery);
      setBanerManagement(designationData.banner_management);
     
      setDesignationfor(designationData.common_designations);
      setCity(designationData.city);

      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, designationData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      designation_name: data.designation_name,

      members_management: membersManagement,
      groups: groupsFor,
      designation: designationFor,
      poll: pollfor,
      mer_chandise: merchandise,
      asso_ciations: associations,

      post_s: posts,
      membership_enquiries: membershipenquiries,
      feed_backs: feedbacks,
      gall_ery: gallery,
      banner_management: bannerManagement,
      leader_ship: false,

      common_designations:designationfor,
      city:cityfor,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      isEdit ? dispatch(putdesignation(id, payload, toast, setIsLoading)) : dispatch(postdesignation(payload, toast, setIsLoading));
      reset();
      push('/dashboard/designationnar');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <RHFTextField name="designation_name" label="Designation Name" />
        </Grid>
        <Grid item xs={12} md={7} />

        <Grid item xs={12} md={6}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <div className="designation-rights">
              <div className="form-group">
                <h3>ADMINISTRATION</h3>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  checked={membersManagement == true ? 'checked' : ''}
                  id="members_management"
                  value={membersManagement}
                  onClick={() => setMembersManagement(membersManagement ? false : true)}
                  name="members_management"
                />
                <label for="members_management">Members</label>
              </div>


              <div className="form-group">
                <input
                  type="checkbox"
                  checked={groupsFor == true ? 'checked' : ''}
                  id="groups"
                  value={groupsFor}
                  onClick={() => setGroups(groupsFor ? false : true)}
                  name="groups"
                />
                <label for="groups">Groups</label>
              </div>


              <div className="form-group">
                <input
                  type="checkbox"
                  checked={designationFor == true ? 'checked' : ''}
                  id="designation"
                  value={designationFor}
                  onClick={() => setDesignation(designationFor ? false : true)}
                  name="designation"
                />
                <label for="designation">Designation</label>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  checked={pollfor == true ? 'checked' : ''}
                  id="poll"
                  value={pollfor}
                  onClick={() => setPoll(pollfor ? false : true)}
                  name="poll"
                />
                <label for="poll">Poll</label>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  id="mer_chandise"
                  checked={merchandise == true ? 'checked' : ''}
                  value={merchandise}
                  onClick={() => setMerchandise(merchandise ? false : true)}
                  name="mer_chandise"
                />
                <label for="mer_chandise">Merchandise</label>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  id="asso_ciations"
                  checked={associations == true ? 'checked' : ''}
                  value={associations}
                  onClick={() => setAssociations(associations ? false : true)}
                  name="asso_ciations"
                />
                <label for="asso_ciations">Associations</label>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <div className="designation-rights">
              <div className="form-group">
                <h3>COMMUNICATION</h3>
              </div>



              <div className="form-group">
                <input
                  type="checkbox"
                  id="post_s"
                  checked={posts == true ? 'checked' : ''}
                  value={posts}
                  onClick={() => setPosts(posts ? false : true)}
                  name="post_s"
                />
                <label for="post_s">Posts</label>
              </div>

              {/* <div className="form-group">
                <input
                  type="checkbox"
                  id="leader_ship"
                  checked={leadership == true ? 'checked' : ''}
                  value={leadership}
                  onClick={() => setLeadership(leadership ? false : true)}
                  name="leader_ship"
                />
                <label for="leader_ship">Leadership</label>
              </div> */}

              <div className="form-group">
                <input
                  type="checkbox"
                  id="membership_enquiries"
                  checked={membershipenquiries == true ? 'checked' : ''}
                  value={membershipenquiries}
                  onClick={() => setMembershipEnquiries(membershipenquiries ? false : true)}
                  name="membership_enquiries"
                />
                <label for="membership_enquiries">Membership Enquiries</label>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  id="feed_backs"
                  checked={feedbacks == true ? 'checked' : ''}
                  value={feedbacks}
                  onClick={() => setFeedbacks(feedbacks ? false : true)}
                  name="feed_backs"
                />
                <label for="feed_backs">Feedbacks</label>
              </div>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="gall_ery"
                  checked={gallery == true ? 'checked' : ''}
                  value={gallery}
                  onClick={() => setGallery(gallery ? false : true)}
                  name="gall_ery"
                />
                <label for="gall_ery">Gallery</label>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  id="banner_management"
                  checked={bannerManagement == true ? 'checked' : ''}
                  value={bannerManagement}
                  onClick={() => setBanerManagement(bannerManagement ? false : true)}
                  name="banner_management"
                />
                <label for="banner_management">Banners</label>
              </div>


            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={3} sx={{ p: 3 }}>
            <div className="designation-rights">
              <div className="form-group">
                <h3>CONFIGRUATION</h3>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  id="common_designations"
                  checked={designationfor == true ? 'checked' : ''}
                  value={designationfor}
                  onClick={() => setDesignationfor(designationfor ? false : true)}
                  name="common_designations"
                />
                <label for="common_designations">Designation</label>
              </div>

              <div className="form-group">
                <input
                  type="checkbox"
                  id="city"
                  checked={cityfor == true ? 'checked' : ''}
                  value={cityfor}
                  onClick={() => setCity(cityfor ? false : true)}
                  name="city"
                />
                <label for="city">City</label>
              </div>

            </div>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12}>
          <Stack alignItems="flex-start">
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {isEdit ? 'Update Now' : 'Post Now'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
