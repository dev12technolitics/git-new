import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { NotificationDetails } from '../../../../sections/@dashboard/notification';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnenotification } from '../../../../redux/slices/notification';


Edit.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Edit() {
    const { themeStretch } = useSettings();
    const dispatch = useDispatch();
    const { oneNotification } = useSelector((state) => state.notification);
    const { query } = useRouter();
    const { id } = query;

    console.log("oneNotification", oneNotification)

    useEffect(() => {
        dispatch(getOnenotification(id));
    }, [dispatch, id]);

    return (
        <Page title="Notification: Details Notification">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Details Notification"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Notification', href: PATH_DASHBOARD.notification.view },
                        { name: oneNotification?.noti_title },
                    ]}
                />

                <NotificationDetails notificationData={oneNotification} id={id} />
            </Container>
        </Page>
    );
}
