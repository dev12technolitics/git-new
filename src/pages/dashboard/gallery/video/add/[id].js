import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import useSettings from '../../../../../hooks/useSettings';
import Layout from '../../../../../layouts';
import Page from '../../../../../components/Page';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import { VideoAddForm } from '../../../../../sections/@dashboard/gallery';
import { useDispatch, useSelector } from '../../../../../redux/store';
import { getOneVideo } from '../../../../../redux/slices/video';
import useLocales from '../../../../../hooks/useLocales';

Edit.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Edit() {

    const { translate } = useLocales();
    const { themeStretch } = useSettings();
    const dispatch = useDispatch();
    const { onevideo } = useSelector((state) => state.video);
    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOneVideo(id));
    }, [dispatch, id]);

    return (
        <Page title="Video Edit">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Video Edit"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "Video", href: PATH_DASHBOARD.video.view },
                        { name: onevideo?.title },
                    ]}
                />

                <VideoAddForm isEdit onevideo={onevideo} id={id} />
            </Container>
        </Page>
    );
}
