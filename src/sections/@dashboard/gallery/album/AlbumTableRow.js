import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, TableRow, TableCell, MenuItem } from '@mui/material';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import moment from 'moment';
// ----------------------------------------------------------------------

AlbumTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function AlbumTableRow({ row, index, selected, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { images, title, date } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>


      <TableCell >{index + 1}</TableCell>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
      <Image disabledEffect alt={title} src={images[0]} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
       
      </TableCell>

      <TableCell>{title}</TableCell>

      <TableCell>{moment(date).format('DD MMM YYYY')}</TableCell>

      <TableCell align="right">
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
