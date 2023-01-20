import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem } from '@mui/material';
// utils
import { fDate, } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/Label';
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
// ----------------------------------------------------------------------

TestimonialsTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function TestimonialsTableRow({ row, index, selected, onEditRow, onSelectRow, onDeleteRow }) {
  
  const theme = useTheme();

  const { test_comment, test_name, test_youtube_link, test_picture,test_rewiew } = row;

console.log("row",row)
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return ( 
    <TableRow hover selected={selected}>


      <TableCell align="left">{index + 1}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left' }}>
        <Image disabledEffect alt={test_name} src={test_picture} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
      </TableCell>

      <TableCell> <Typography variant="subtitle2" noWrap>
        {test_name}
      </Typography></TableCell>

      <TableCell align="left">
        {test_youtube_link}
      </TableCell>

      {/* <TableCell align="left">{test_comment}</TableCell> */}
      <TableCell align="left">{test_rewiew}</TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
