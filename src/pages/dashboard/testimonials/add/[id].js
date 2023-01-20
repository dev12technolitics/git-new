import {  useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import useSettings from '../../../../hooks/useSettings';
import Layout from '../../../../layouts';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TestimonialsAddForm } from '../../../../sections/@dashboard/testimonials';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getOneTestimonial } from '../../../../redux/slices/testimonial';


Edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
}; 

export default function Edit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { oneTestimonial } = useSelector((state) => state.testimonial);
  const { query } = useRouter();
  const { id } = query;
  useEffect(() => {
    dispatch(getOneTestimonial(id));
  }, [dispatch, id]);

  return (
    <Page title="Testimonials: Edit Testimonials">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Testimonials"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Testimonials', href: PATH_DASHBOARD.testimonials.view },
            { name: 'Edit Testimonials' },
          ]}
        />

        <TestimonialsAddForm isEdit testimonialsData={oneTestimonial} id={id} />
      </Container>
    </Page>
  );
}
