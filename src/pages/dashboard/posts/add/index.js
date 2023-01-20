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
import { PostAddForm } from '../../../../sections/@dashboard/posts';

// ----------------------------------------------------------------------

AddPosts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddPosts() {
  const { themeStretch } = useSettings();

  return (
    <Page title='Posts: Add Posts'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Posts"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Posts', href: PATH_DASHBOARD.posts.view },
            { name: 'Add Posts' },
          ]}
        />
        <PostAddForm />
      </Container>
    </Page>
  );
}
