import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
//
import moment from 'moment';
// ----------------------------------------------------------------------

GroupsTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function GroupsTableRow({ groupId, row, index, onEditRow, onDeleteRow, onDetail }) {
  const theme = useTheme();

  const { group_name, created_at, creater, membersCount } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>

        <TableCell onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
          {group_name}
        </TableCell>

        <TableCell>
          <a href={`/dashboard/groups/detail/${groupId}`} style={{
            textDecoration: 'none',
            color: 'black'
           
          }}>
            <TableCell align="left" style={{ cursor: 'pointer' }}>
              {membersCount}
            </TableCell>
          </a>
        </TableCell>

        <TableCell align="left">{moment(created_at).format('DD MMM YYYY')}</TableCell>

        <TableCell align="left">{creater}</TableCell>

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
    </>
  );
}
