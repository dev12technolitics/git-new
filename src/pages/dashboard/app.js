// @mui
import { Container, Grid } from '@mui/material';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// _mock_
// components
import Page from '../../components/Page';
import {
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import { useEffect } from 'react';
import { SeoIllustration } from '../../assets';
import SvgIconStyle from '../../components/SvgIconStyle';
import { getMembershipEnquiry } from '../../redux/slices/membershipenquiry';
import { useDispatch, useSelector } from '../../redux/store';
import {
  BankingWidgetSummary
} from '../../sections/@dashboard/general/banking';

GeneralApp.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
  stafficon: getIcon('ic_staff'),
  devicon: getIcon('ic_dev'),
  enqurieicon: getIcon('ic_enqurie'),
  countryicon: getIcon('ic_country'),
  cityicon: getIcon('ic_city'),
  localityItem: getIcon('ic_locality'),
  amenItem: getIcon('ic_amen'),
  dnationItem: getIcon('ic_dnation'),
  happystories: getIcon('ic_happystories'),
  buildericon: getIcon('ic_builder'),
  projectsicon: getIcon('ic_projects'),
  featuredItem: getIcon('ic_featured'),
};
export default function GeneralApp() {
 
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { allEnquiry } = useSelector((state) => state.membershipenquiry);

  console.log("allEnquiry",allEnquiry)

  useEffect(() => {
    dispatch(getMembershipEnquiry());
  }, [dispatch]);

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title="Welcome To 
              NAR INDIA Management Panel"
              description="Setting the highest and most ethical standards and practices in the field of real estate consulting and nothing less."
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              
              // action={<Button variant="contained">Add Member</Button>}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <BankingWidgetSummary
              title="Membership Enquiry"
              icon={'eva:diagonal-arrow-right-up-fill'}
              percent={-0.5}
              total={allEnquiry?.length}
              chartData={[111, 136, 76, 108, 74, 54, 57, 84]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
