import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Box } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { ShopAddForm } from '../../../../sections/@dashboard/shop';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOneShop } from '../../../../redux/slices/shop';

Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Edit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { oneShop } = useSelector((state) => state.shop);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOneShop(id));
  }, [dispatch, id]);

  return (
    <Page title="Shop: Edit Shop">
      <Container maxWidth={themeStretch ? false : 'lg'}>

        <HeaderBreadcrumbs
          heading="Edit Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Shop', href: PATH_DASHBOARD.shop.view },
            { name: oneShop?.title },
          ]}
        />
        
        <ShopAddForm isEdit shopData={oneShop} id={id} />

      </Container>
    </Page >
  );
}
