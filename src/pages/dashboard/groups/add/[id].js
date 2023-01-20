import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AddGroupForm } from '../../../../sections/@dashboard/groups/model';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnegroup } from '../../../../redux/slices/groups';

EditGroup.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function EditGroup() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { onegroup } = useSelector((state) => state.groups);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnegroup(id));
  }, [dispatch, id]);

  return (
    <Page title="Group: Edit Group">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Group"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Group Management', href: PATH_DASHBOARD.groups.view },
            { name: onegroup?.group_name },
          ]}
        />
        <AddGroupForm isEdit groupData={onegroup} id={id} />
      </Container>
    </Page>
  );
}
