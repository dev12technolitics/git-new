import { InputAdornment, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

GroupsTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function GroupsTableToolbar({ filterName, onFilterName, id }) {
  return (
    <>
      <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
        <TextField
          fullWidth
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search by name , associations name and designations name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />        
      </Stack>
    </>
  );
}
