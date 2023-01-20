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
import { NotificationAddForm } from '../../../../sections/@dashboard/notification';
// ----------------------------------------------------------------------

Add.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Add() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Notification : Add">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Notification"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Notification', href: PATH_DASHBOARD.notification.view },
            { name: 'Add Notification',},
          ]}
        />

        <NotificationAddForm />
      </Container>
    </Page>
  );
}
