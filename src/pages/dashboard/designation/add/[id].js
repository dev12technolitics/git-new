import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { DesignationsAddForm } from '../../../../sections/@dashboard/designation';

import { useDispatch, useSelector } from '../../../../redux/store';
import { getOneDesignation } from '../../../../redux/slices/designation'; 


Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function Edit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const {  onedesignation } = useSelector((state) => state.designationnar);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOneDesignation(id));
  }, [dispatch, id]);

  return (
    <Page title="Designation: Edit Designation">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Designation"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Designation', href: PATH_DASHBOARD.designation.view },
            { name: onedesignation?.designation_name },
          ]}
        />
        <DesignationsAddForm isEdit designationData={onedesignation} id={id} />
      </Container>
    </Page>
  );
}
