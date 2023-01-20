import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Page from '../../../../components/Page';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import { getOnemember } from '../../../../redux/slices/members';
import { useDispatch, useSelector } from '../../../../redux/store';
import MembersEditForm from './MembersEditForm';


MembersEdit.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function MembersEdit() {

    const { themeStretch } = useSettings();
    const dispatch = useDispatch();
    const { onemember } = useSelector((state) => state.member);
    const { query } = useRouter();
    const { id } = query;

    useEffect(() => {
        dispatch(getOnemember(id));
    }, [dispatch, id]);

    console.log("onemember",onemember)

    return (
        <Page title="Members">
            <MembersEditForm isEdit membersData={onemember} id={id} />
        </Page>
    );
}