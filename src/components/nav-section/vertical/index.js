import PropTypes from 'prop-types';
// @mui
import { Box, List, ListSubheader } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useLocales from '../../../hooks/useLocales';
//
import { NavListRoot } from './NavList';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import useAuth from '../../../hooks/useAuth';

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
  subscription: getIcon('ic_sub'),
  posts: getIcon('ic_posts'),
  association: getIcon('ic_association'),
  galleryicon: getIcon('ic_galleryicon'),
  pollicon: getIcon('ic_pollicon'),
  leadershipicon: getIcon('ic_leadershipicon'),
  designaticon: getIcon('ic_designation')
};

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  })
);

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({ isCollapse = false, ...other }) {
  const { translate } = useLocales();
  const { user } = useAuth();

  console.log("user1232", user)
  return (
    <Box {...other}>
      <List disablePadding sx={{ px: 2 }}>
        <ListSubheaderStyle
          sx={{
            ...(isCollapse && {
              opacity: 0,
            }),
          }}
        />

        <NavListRoot
          list={{ title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }}
          isCollapse={isCollapse}
        />
      </List>


      {user?.designations?.members_management == true ||
        user?.designations?.groups == true ||
        user?.designations?.designation == true ||
        user?.designations?.poll == true ||
        user?.designations?.mer_chandise == true ||
        user?.designations?.asso_ciations == true ? (
        <List disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            ADMINISTRATION
          </ListSubheaderStyle>

          {user?.designations?.members_management == true ? (
            <NavListRoot
              list={{
                title: 'Members Management',
                path: PATH_DASHBOARD.user.root,
                icon: ICONS.user,
                children: [
                  { title: 'Members', path: PATH_DASHBOARD.members.view },
                  { title: 'Groups', path: PATH_DASHBOARD.groups.view },
                  { title: 'Nar Designation Rights', path: PATH_DASHBOARD.designationnar.view },
                ],
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.poll == true ? (
            <NavListRoot
              list={{
                title: 'Poll',
                path: PATH_DASHBOARD.poll.view,
                icon: ICONS.pollicon,
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.mer_chandise == true ? (
            <NavListRoot
              list={{
                title: 'Merchandise',
                path: PATH_DASHBOARD.shop.view,
                icon: ICONS.cart,
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.asso_ciations == true ? (
            <NavListRoot
              list={{ title: 'Associations', path: PATH_DASHBOARD.association.view, icon: ICONS.association }}
              isCollapse={isCollapse}
            />
          ) : null}

        </List>
      ) : null}


      {user?.designations?.post_s == true ||
        // user?.designations?.leader_ship == true ||
        user?.designations?.membership_enquiries == true ||
        user?.designations?.feed_backs == true ||
        user?.designations?.gall_ery == true ||
        user?.designations?.banner_management == true ? (
        <List disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            COMMUNICATION
          </ListSubheaderStyle>

          {user?.designations?.post_s == true ? (
            <NavListRoot
              list={{
                title: 'Posts',
                path: PATH_DASHBOARD.posts.view,
                icon: ICONS.posts,
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {/* {user?.designations?.leader_ship == true ? (
            <NavListRoot
              list={{ title: 'Leadership', path: PATH_DASHBOARD.leadership.view, icon: ICONS.leadershipicon }}
              isCollapse={isCollapse}
            />
          ) : null} */}

          {user?.designations?.membership_enquiries == true ? (
            <NavListRoot
              list={{ title: 'Membership Enquiries', path: PATH_DASHBOARD.membershipenquiry.view, icon: ICONS.chat }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.feed_backs == true ? (
            <NavListRoot
              list={{
                title: 'Feedbacks',
                path: PATH_DASHBOARD.feedback.view,
                icon: ICONS.enqurieicon,
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.gall_ery == true ? (
            <NavListRoot
              list={{
                title: 'Gallery',
                path: PATH_DASHBOARD.user.root,
                icon: ICONS.galleryicon,
                children: [
                  { title: 'Album', path: PATH_DASHBOARD.album.view },
                  { title: 'Video', path: PATH_DASHBOARD.video.view },
                ],
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.banner_management == true ? (
            <NavListRoot
              list={{ title: 'Banners', path: PATH_DASHBOARD.banner.view, icon: ICONS.kanban }}
              isCollapse={isCollapse}
            />
          ) : null}
        </List>
      ) : null}

      {user?.designations?.common_designations == true ||
        user?.designations?.city == true ? (
        <List disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            CONFIGRUATION
          </ListSubheaderStyle>

          {user?.designations?.common_designations == true ? (
            <NavListRoot
              list={{
                title: 'Designation',
                path: PATH_DASHBOARD.designation.view,
                icon: ICONS.designaticon,
              }}
              isCollapse={isCollapse}
            />
          ) : null}

          {user?.designations?.city == true ? (
            <NavListRoot
              list={{
                title: 'City',
                path: PATH_DASHBOARD.city.view,
                icon: ICONS.cityicon,
              }}
              isCollapse={isCollapse}
            />
          ) : null}
        </List>
      ) : null}
    </Box>
  );
}
