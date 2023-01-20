import { MenuItem, TableCell, TableRow } from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';

VideoTableRow.propTypes = {
  row: PropTypes.object,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function VideoTableRow({ row, index, onEditRow, onDeleteRow }) {
  const { title, youtube_link, date } = row;

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

      <TableCell>{title}</TableCell>

      <TableCell>
        <Link href={youtube_link} target="_blank" style={{ textDecoration: 'none' }}>
          {youtube_link}
        </Link>
      </TableCell>

      <TableCell>{moment(date).format('DD MMM YYYY')}</TableCell>

      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Edit
              </MenuItem>
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
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
