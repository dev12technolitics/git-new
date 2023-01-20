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
import { AddGroupForm } from '../../../../sections/@dashboard/groups/model';

// ----------------------------------------------------------------------

AddGroup.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function AddGroup() {
    const { themeStretch } = useSettings();

    return (
        <Page title='Group: Add Group'>
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Create a new Group Management"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Group Management', href: PATH_DASHBOARD.groups.view },
                        { name: 'Add Group Management' },
                    ]}
                />
                <AddGroupForm />
            </Container>
        </Page>
    );
}
