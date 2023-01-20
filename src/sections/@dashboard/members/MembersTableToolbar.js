import { InputAdornment, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';

import { CSVLink } from 'react-csv';

MembersTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function MembersTableToolbar({
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
        placeholder="Search by Name,  Email Id, Contact No, and  City"
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
        filename="Members_List.csv"
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
