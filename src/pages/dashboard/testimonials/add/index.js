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
import { TestimonialsAddForm } from '../../../../sections/@dashboard/testimonials';

// ----------------------------------------------------------------------

Add.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Add() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Testimonials: New Testimonials">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new Testimonials"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Testimonials', href: PATH_DASHBOARD.testimonials.view },
            { name: 'New Testimonials' },
          ]}
        />

        <TestimonialsAddForm  />
      </Container>
    </Page>
  );
}
