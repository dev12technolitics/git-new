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
import { PollAddForm } from '../../../../sections/@dashboard/poll';
// ----------------------------------------------------------------------

AddPoll.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddPoll() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Poll: Add">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="New Poll"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Poll', href: PATH_DASHBOARD.poll.view },
            { name: 'Add Poll',},
          ]}
        />

        <PollAddForm isEdit={false} />
      </Container>
    </Page>
  );
}
