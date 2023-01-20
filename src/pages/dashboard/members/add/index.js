// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
// layouts
import Layout from '../../../../layouts';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
// sections
import { MembersAddForm } from '../../../../sections/@dashboard/members';

AddMembers.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function AddMembers() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Members: Add Members">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create A New Members"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Members', href: PATH_DASHBOARD.members.view },
            { name: 'Add Members' },
          ]}
        />

        <MembersAddForm />
      </Container>
    </Page>
  );
}
