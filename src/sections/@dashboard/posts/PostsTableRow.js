import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';

PostsTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDetail: PropTypes.func,
};

export default function PostsTableRow({ row, index, onEditRow, onDeleteRow, onDetail }) {
  const theme = useTheme();

  const { title, created_at, postedBy , category, user_type } = row;

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
          {title}
        </TableCell>

        <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
          {category[0]?.name}
        </TableCell>

        <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
          {user_type}
        </TableCell>

        <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
          {postedBy[0]?.name}
        </TableCell>

        <TableCell align="left">{moment(created_at).format('DD MMM YYYY')}</TableCell>

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
