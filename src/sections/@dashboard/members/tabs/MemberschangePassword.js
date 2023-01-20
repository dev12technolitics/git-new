import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import MemberschangePasswordForm from './MemberschangePasswordForm';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnemember } from '../../../../redux/slices/members';


MemberschangePassword.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function MemberschangePassword() {
  const dispatch = useDispatch();
  
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnemember(id));
  }, [dispatch, id]);

  return (
    <Page title="Members">
        <MemberschangePasswordForm id={id} />
    </Page>
  );
}