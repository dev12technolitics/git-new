// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

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

const navConfig = [
  {
    subheader: '',
    items: [{ title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },

  {
    subheader: 'NAR MANAGEMENT',
    items: [
      {
        title: 'Member Management',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user, 
        children: [
          { title: 'Members', path: PATH_DASHBOARD.members.view },
          { title: 'Groups', path: PATH_DASHBOARD.groups.view },
        ],
      },

    ],
  },

];

export default navConfig;
