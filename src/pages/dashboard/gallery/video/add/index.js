import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import useSettings from '../../../../../hooks/useSettings';
import Layout from '../../../../../layouts';
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { VideoAddForm } from '../../../../../sections/@dashboard/gallery';
import useLocales from '../../../../../hooks/useLocales';

Add.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Add() {

    const { translate } = useLocales();
    const { themeStretch } = useSettings();

    return (
        <Page title="Video Add">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Video Add"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "Video", href: PATH_DASHBOARD.video.view },
                        { name: "Video Add" },
                    ]}
                />

                <VideoAddForm />
            </Container>
        </Page>
    );
}
