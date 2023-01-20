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
import { DesignationsAddForm } from '../../../../sections/@dashboard/designation';
// ----------------------------------------------------------------------

Add.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Add() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Designation : Add">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Designation"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Designation', href: PATH_DASHBOARD.designation.view },
            { name: 'Add Designation',},
          ]}
        />
        <DesignationsAddForm />
      </Container>
    </Page>
  );
}
