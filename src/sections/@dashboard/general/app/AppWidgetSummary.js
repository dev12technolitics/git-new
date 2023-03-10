import PropTypes from 'prop-types';
// @mui
import { Box, Card, Stack, Typography } from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
// utils
import { fNumber } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import { ListItemIconStyle } from '../../../../components/nav-section/vertical/style';
// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  chartColor: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ icon, title, percent, total, totalNotify, chartColor, chartData, sx, ...other }) {
  const theme = useTheme();

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `@${seriesName}`,
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">
          <ListItemIconStyle   sx={{ float: 'left' }} >
            {icon}
          </ListItemIconStyle>
          {title} <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            // color={'success'}
            sx={{ float: 'right' }}
          >New {totalNotify}</Label>
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          {/* <IconWrapperStyle 
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          </IconWrapperStyle> */}

          {/* <Typography component="span" variant="subtitle2">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography> */}
        </Stack>

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>

      {/* <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} /> */}
    </Card>
  );
}
