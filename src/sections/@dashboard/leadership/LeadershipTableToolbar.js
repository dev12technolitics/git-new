import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem, Tooltip, CircularProgress, IconButton } from '@mui/material';

import Iconify from '../../../components/Iconify';
import { LoadingButton } from '@mui/lab';

import { useRouter } from 'next/router';
import {CSVLink, CSVDownload} from 'react-csv'

const INPUT_WIDTH = 160;

LeadershipTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function LeadershipTableToolbar({
  filterName,
  onFilterName,
  headers,
  getDownload
}) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search by Name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <CSVLink
        data={getDownload ? getDownload : null}
        headers={headers ? headers : null}
        filename="Leadership_List.csv"
        target="_blank"
        style={{ textDecoration: 'none' }}
      >
        <LoadingButton type="submit" variant="contained" size="" sx={{ py: 2, px: 2 }}>
          Excel
        </LoadingButton>
      </CSVLink>
    </Stack>
  );
}
