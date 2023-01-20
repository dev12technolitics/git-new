import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { TableMoreMenu } from '../../../components/table';

AssociationTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function AssociationTableRow({ row, index, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { name, image, city_name } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  console.log(row);

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell>
        {image !== '' ? (
          <Image disabledEffect alt={name} src={image} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
        ) : null}
      </TableCell>

      <TableCell>{name}</TableCell>

      <TableCell>{city_name}</TableCell>

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
