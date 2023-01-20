import { capitalCase } from 'change-case';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useTabs from '../../../../hooks/useTabs';
// layouts
import Layout from '../../../../layouts';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Iconify from '../../../../components/Iconify';
import Page from '../../../../components/Page';
import { getOnemember } from '../../../../redux/slices/members';
import { useDispatch, useSelector } from '../../../../redux/store';

import { MemberschangePassword, MembersEdit } from '../../../../sections/@dashboard/members/tabs';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: '15px',
  width: '100%',
  display: 'flex',
  position: 'absolute',
  // backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
    paddingRight: theme.spacing(4),
  },
}));

// ----------------------------------------------------------------------

Order.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Order() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const { onemember } = useSelector((state) => state.member);
  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnemember(id));
  }, [dispatch, id]);

  const { currentTab, onChangeTab } = useTabs('Members Edit');

  const PROFILE_TABS = [
    {
      value: 'Members Edit',
      icon: <Iconify icon={'bxs:comment-edit'} width={20} height={20} />,
      component: <MembersEdit />,
    },

    {
      value: 'Change Password',
      icon: <Iconify icon={'ri:lock-password-line'} width={20} height={20} />,
      component: <MemberschangePassword />,
    },
  ];

  return (
    <Page title="Members">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit Members"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Members', href: PATH_DASHBOARD.members.view },
            { name: onemember?.name },
          ]}
        />

        <Box
          sx={{
            mt: 10,
            position: 'relative',
          }}
        >
          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Box>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
