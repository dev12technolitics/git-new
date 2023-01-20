import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { TableMoreMenu } from '../../../components/table';

ShopTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ShopTableRow({ row, index, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { title, image, backlink } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell>
        {image !== '' ? (
          <Image disabledEffect alt={title} src={image} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
        ) : null}
      </TableCell>

      <TableCell>{title}</TableCell>

      <TableCell align="left">
        <Link href={backlink} target="_blank" style={{ textDecoration: 'none' }}>
          {backlink}
        </Link>
      </TableCell>

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
