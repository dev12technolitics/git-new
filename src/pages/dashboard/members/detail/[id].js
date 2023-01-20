import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { MembersDetail  } from '../../../../sections/@dashboard/members';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnemember } from '../../../../redux/slices/members'; 


Detail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Detail() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { onemember } = useSelector((state) => state.member);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnemember(id));
  }, [dispatch, id]);

  return ( 
    <Page title="Members : Detail Members">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Detail Members"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Members', href: PATH_DASHBOARD.members.view },
            { name: onemember?.name },
          ]}
        />

        <MembersDetail membersData={onemember} id={id} />
      </Container>
    </Page>
  );
}
