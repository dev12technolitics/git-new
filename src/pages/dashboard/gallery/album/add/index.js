import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import useSettings from '../../../../../hooks/useSettings';
import Layout from '../../../../../layouts';
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { AlbumAddForm } from '../../../../../sections/@dashboard/gallery';
import useLocales from '../../../../../hooks/useLocales';

Add.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Add() {

    const { translate } = useLocales();
    const { themeStretch } = useSettings();

    return (
        <Page title="Album Add">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Album Add"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "Album", href: PATH_DASHBOARD.album.view },
                        { name: "Album Add" },
                    ]}
                />

                <AlbumAddForm />
            </Container>
        </Page>
    );
}
