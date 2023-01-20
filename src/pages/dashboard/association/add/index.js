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
import { AssociationAddForm } from '../../../../sections/@dashboard/association';

// ----------------------------------------------------------------------

AddAssociation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddAssociation() {
  
  const { themeStretch } = useSettings();

  return (
    <Page title='Association : Add Association'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
         heading="Create a new Association"
         links={[
           { name: 'Dashboard', href: PATH_DASHBOARD.root },
           { name: 'Association', href: PATH_DASHBOARD.association.view },
            { name: 'Add Association' },
          ]}
        />
        <AssociationAddForm />
      </Container>
    </Page>
  );
}
