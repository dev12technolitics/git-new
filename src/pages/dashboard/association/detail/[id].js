import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import { PATH_DASHBOARD } from '../../../../routes/paths';

import { DetailAssociationForm } from '../../../../sections/@dashboard/groups';

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
    <Page title="Association: Detail Association">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Detail Association"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Association Management', href: PATH_DASHBOARD.groups.view },
            { name: onegroup?.name },
          ]}
        />

        <DetailAssociationForm
          isEdit
          groupData={onegroup} memberData={onegroup} isLoading={isLoading} id={id}
        />
      </Container>
    </Page>
  );
}
