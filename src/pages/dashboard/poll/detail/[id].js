import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { Polldetail } from '../../../../sections/@dashboard/poll';

import { getOnepoll } from '../../../../redux/slices/poll';
import { useDispatch, useSelector } from '../../../../redux/store';

Detail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Detail() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { onepoll } = useSelector((state) => state.poll);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnepoll(id));
  }, [dispatch, id]);

  return (
    <Page title="Poll: Details Poll">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Details Poll"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Poll', href: PATH_DASHBOARD.poll.view },
            { name: onepoll?.title },
          ]}
        />
        <Polldetail pollData={onepoll} id={id} />
      </Container>
    </Page>
  );
}
