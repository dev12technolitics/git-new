import { capitalCase } from 'change-case';
// routes
import { Box, Button, Container, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import useTabs from '../../../hooks/useTabs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import NextLink from 'next/link';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import Layout from '../../../layouts';
import { Association, Groups } from '../../../sections/@dashboard/groups';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: '15px',
  width: '100%',
  display: 'flex',
  position: 'absolute',
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

  const { currentTab, onChangeTab } = useTabs('Management Groups');

  const PROFILE_TABS = [
    {
      value: 'Management Groups',
      // icon: <Iconify icon={'bxs:comment-edit'} width={20} height={20} />,
      component: <Groups />,
    },
    {
      value: 'Association Groups',
      // icon: <Iconify icon={'ri:lock-password-line'} width={20} height={20} />,
      component: <Association />,
    },
  ];

  return (
    <Page title="Members">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Group Management "
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Group Management', href: PATH_DASHBOARD.groups.view },
            { name: 'Groups List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.groups.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Groups
              </Button>
            </NextLink>
          }
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
