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
import { CityAddForm } from '../../../../sections/@dashboard/city';
// ----------------------------------------------------------------------

AddCity.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddCity() {
  const { themeStretch } = useSettings();

  return (
    <Page title="City : Add">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new City"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'City', href: PATH_DASHBOARD.city.view },
            { name: 'Add City',},
          ]}
        />
        <CityAddForm />
      </Container>
    </Page>
  );
}
