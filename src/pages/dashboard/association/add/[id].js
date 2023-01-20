import {  useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { AssociationAddForm } from '../../../../sections/@dashboard/association';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOneAssociation } from '../../../../redux/slices/association';

EditAssociation.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
 
export default function EditAssociation() {

  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { oneAssociation } = useSelector((state) => state.association);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOneAssociation(id));
  }, [dispatch, id]);

  return (
    <Page title="Association: Edit Association">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Association"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Association', href: PATH_DASHBOARD.association.view },
            { name: oneAssociation?.title },
          ]}
        />

        <AssociationAddForm isEdit AssociationData={oneAssociation} id={id} />
      </Container>
    </Page>
  );
}
