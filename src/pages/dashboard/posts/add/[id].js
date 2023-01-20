import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOnePosts } from '../../../../redux/slices/posts';
import { PostAddForm } from '../../../../sections/@dashboard/posts';

PostsEdit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default function PostsEdit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { oneposts } = useSelector((state) => state.posts);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnePosts(id));
  }, [dispatch, id]);

  return (
    <Page title="Posts: Edit Posts">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Posts"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Posts', href: PATH_DASHBOARD.posts.view },
            { name: oneposts?.title },
          ]}
        />
        <PostAddForm isEdit postData={oneposts} id={id} />
      </Container>
    </Page>
  );
}
 