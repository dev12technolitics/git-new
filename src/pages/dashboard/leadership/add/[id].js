import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';

import { LeadershipAddForm } from '../../../../sections/@dashboard/leadership';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getOneLeadership } from '../../../../redux/slices/leadership';

EditLeadership.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function EditLeadership() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { oneleadership } = useSelector((state) => state.leadership);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOneLeadership(id));
  }, [dispatch, id]);

  return (
    <Page title="Leadership: Edit Leadership">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Leadership"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Leadership', href: PATH_DASHBOARD.leadership.view },
            { name: oneleadership?.name },
          ]}
        />
        <LeadershipAddForm isEdit leadershipData={oneleadership} id={id} />
      </Container>
    </Page>
  );
}
