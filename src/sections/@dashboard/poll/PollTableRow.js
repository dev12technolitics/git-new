import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

PollTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDetail: PropTypes.func,
};

export default function PollTableRow({ row, index, selected, onEditRow, onDeleteRow ,onDetail}) {
  const theme = useTheme();

  const { _id, title, created_at } = row;

  const [openMenu, setOpenMenuActions] = useState(null);
  console.log(index);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left" onClick={() => onDetail()}  style={{ cursor: 'pointer' }}>{title}</TableCell>

      <TableCell align="left" onClick={() => onDetail()}  style={{ cursor: 'pointer' }}>{moment(created_at).format('DD MMM YYYY')}</TableCell>

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
              <a href={`/dashboard/poll/add/${_id}`} style={{textDecoration: 'none', color: "black"}}>
                <MenuItem>
                  <Iconify icon={'eva:edit-fill'} />
                  Edit
                </MenuItem>
              </a>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
