import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import { PATH_DASHBOARD } from '../../../../routes/paths';

import { DetailGroupForm } from '../../../../sections/@dashboard/groups';

import { getOnegroup } from '../../../../redux/slices/groups';
import { useDispatch, useSelector } from '../../../../redux/store';

EditGroup.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function EditGroup() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { isLoading, onegroup } = useSelector((state) => state.groups);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnegroup(id));
  }, [dispatch, id]);

  return (
    <Page title="Group: Detail Group">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Detail Group"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Group Management', href: PATH_DASHBOARD.groups.view },
            { name: onegroup?.group_name },
          ]}
        />
        <DetailGroupForm isEdit groupData={onegroup} memberData={onegroup} isLoading={isLoading} id={id} />
      </Container>
    </Page>
  );
}
