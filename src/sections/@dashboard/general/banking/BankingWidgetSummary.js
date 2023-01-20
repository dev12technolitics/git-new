import merge from 'lodash/merge';
import PropTypes from 'prop-types';
// @mui
import { Button, Card, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { fCurrency } from '../../../../utils/formatNumber';
// components
import NextLink from 'next/link';
import { BaseOptionChart } from '../../../../components/chart';
import Iconify from '../../../../components/Iconify';
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 48,
  height: 48,
  display: 'flex',
  borderRadius: '50%',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(3),
  right: theme.spacing(3),
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

BankingWidgetSummary.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error']),
  icon: PropTypes.string.isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function BankingWidgetSummary({
  title,
  total,
  icon,
  percent,
  color = 'primary',
  chartData,
  sx,
  ...other
}) {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    colors: [theme.palette[color].main],
    chart: { sparkline: { enabled: true } },
    xaxis: { labels: { show: false } },
    yaxis: { labels: { show: false } },
    stroke: { width: 4 },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fCurrency(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    fill: { gradient: { opacityFrom: 0.56, opacityTo: 0.56 } },
  });

  return (
    <Card
      sx={{
        width: 1,
        boxShadow: 0,
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].lighter,
          bgcolor: (theme) => theme.palette[color].dark,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Stack spacing={1} sx={{ p: 3 }}>
        <Typography sx={{ typography: 'subtitle2' }}>{title}</Typography>

        <Typography sx={{ typography: 'h3' }}>{total}</Typography>
        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <Typography variant="body2" component="span" sx={{ opacity: 0.72 }}>
            Total no. of membership enquiries we have received till date
          </Typography>
        </Stack>
        <Typography sx={{ typography: 'h3' }}>
          <NextLink href={PATH_DASHBOARD.membershipenquiry.view} passHref sx={{ pt: 5 }}>
            <Button variant="contained">
              View Enquiries
            </Button>
          </NextLink>
        </Typography>

      </Stack>


    </Card>
  );
}
