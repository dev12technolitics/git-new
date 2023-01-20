// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
// sections
import { LeadershipAddForm } from '../../../../sections/@dashboard/leadership';
// ----------------------------------------------------------------------

AddLeadership.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddLeadership() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Leadership : Add">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="New Leadership"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Leadership', href: PATH_DASHBOARD.leadership.view },
            { name: 'Add Leadership',},
          ]}
        />

        <LeadershipAddForm />
      </Container>
    </Page>
  );
}
