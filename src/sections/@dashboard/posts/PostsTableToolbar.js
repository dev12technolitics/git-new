import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';

import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/Iconify';

import { CSVLink } from 'react-csv';

const INPUT_WIDTH = 160;

PostsTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onCategoryRole: PropTypes.func,
  allCategory: PropTypes.arrayOf(PropTypes.string),
};

export default function PostsTableToolbar({
  filterName,
  onFilterName,
  headers,
  getDownload,
  onCategoryRole,
  categoryRole,
  allCategory,
}) {
  return (
    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Search by title"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        select
        label="Category"
        value={categoryRole}
        onChange={onCategoryRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        <MenuItem
          value="All"
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          All
        </MenuItem>
        {allCategory.map((option, index) => (
          <MenuItem
            key={index}
            value={option?._id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <CSVLink
        data={getDownload ? getDownload : null}
        headers={headers ? headers : null}
        filename="Shop.csv"
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
