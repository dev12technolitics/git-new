import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { BannerAddForm } from '../../../../sections/@dashboard/banner';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnebanner } from '../../../../redux/slices/banner';

Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Edit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { oneBanner } = useSelector((state) => state.banner);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnebanner(id));
  }, [dispatch, id]);

  return (
    <Page title="Banner: Edit Banner">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        
        <HeaderBreadcrumbs
          heading="Edit Banner"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Banner', href: PATH_DASHBOARD.banner.view },
            { name: oneBanner.ban_title },
          ]}
        />

        <BannerAddForm isEdit bannerData={oneBanner} id={id} />
      </Container>
    </Page>
  );
}
 