import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { CityAddForm } from '../../../../sections/@dashboard/city';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnecity } from '../../../../redux/slices/city'; 


Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Edit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const {  oneCity } = useSelector((state) => state.city);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnecity(id));
  }, [dispatch, id]);

  return (
    <Page title="City: Edit City">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit City"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'City', href: PATH_DASHBOARD.city.view },
            { name: oneCity?.city_name },
          ]}
        />
        <CityAddForm isEdit cityData={oneCity} id={id} />
      </Container>
    </Page>
  );
}
