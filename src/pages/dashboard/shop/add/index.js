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
import { ShopAddForm } from '../../../../sections/@dashboard/shop';

// ----------------------------------------------------------------------

AddShop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddShop() {
  
  const { themeStretch } = useSettings();

  return (
    <Page title='Shop : Add Shop'>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
         heading="Create a new Shop"
         links={[
           { name: 'Dashboard', href: PATH_DASHBOARD.root },
           { name: 'Shop', href: PATH_DASHBOARD.shop.view },
            { name: 'Add Shop' },
          ]}
        />
        <ShopAddForm />
      </Container>
    </Page>
  );
}
