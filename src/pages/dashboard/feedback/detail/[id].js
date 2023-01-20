import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import { getoneFeedback } from '../../../../redux/slices/feedback';
import { useDispatch, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { FeedbackDetail } from '../../../../sections/@dashboard/feedback';

DetailFeedback.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function DetailFeedback() {
    const { themeStretch } = useSettings();
    const dispatch = useDispatch();
    const { oneFeedback } = useSelector((state) => state.feedback);
    const { query } = useRouter();
    const { id } = query;

    console.log("oneFeedback", oneFeedback)
    useEffect(() => {
        dispatch(getoneFeedback(id));
    }, [dispatch, id]);

    return (
        <Page title="Feedback: Detail Feedback">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Detail Feedback"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Feedback', href: PATH_DASHBOARD.feedback.view },
                        { name: oneFeedback?.userId },
                    ]}
                />

                <FeedbackDetail FeedbackData={oneFeedback} />
            </Container>
        </Page>
    );
}
