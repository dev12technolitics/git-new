import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderBreadcrumbs from '../../../../../components/HeaderBreadcrumbs';
import Page from '../../../../../components/Page';
import useLocales from '../../../../../hooks/useLocales';
import useSettings from '../../../../../hooks/useSettings';
import Layout from '../../../../../layouts';
import { getOnegallery } from '../../../../../redux/slices/gallery';
import { useDispatch, useSelector } from '../../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import { AlbumAddForm } from '../../../../../sections/@dashboard/gallery';

Edit.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Edit() {

    const { translate } = useLocales();
    const { themeStretch } = useSettings();
    const dispatch = useDispatch();
    const { onegallery } = useSelector((state) => state.gallery);
    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOnegallery(id));
    }, [dispatch, id]);

    return (
        <Page title="Album Edit">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Album Edit"
                    links={[
                        { name: "Dashboard", href: PATH_DASHBOARD.root },
                        { name: "Album", href: PATH_DASHBOARD.album.view },
                        { name: onegallery?.title },
                    ]}
                />

                <AlbumAddForm isEdit GalleryData={onegallery} id={id} />
            </Container>
        </Page>
    );
}
