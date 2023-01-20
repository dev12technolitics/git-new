import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import moment from 'moment';
import Link from 'next/link';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { TableMoreMenu } from '../../../components/table';
// ----------------------------------------------------------------------

BannerTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function BannerTableRow({ row, index, selected, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { ban_type, ban_title, pro_link, ban_image, created_at } = row;

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
        <Image
          disabledEffect
          alt={ban_title}
          src={ban_image}
          sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
        />
      </TableCell>

      <TableCell>
        <Typography variant="subtitle2" noWrap>
          {ban_title}
        </Typography>
      </TableCell>

      <TableCell align="left">{ban_type}</TableCell>

      <TableCell align="left">
        <Link href={pro_link}  target="_blank" style={{ textDecoration: 'none' }}>
          {pro_link}
        </Link>
      </TableCell>

      <TableCell align="left" width={150}>
        {moment(created_at).format('DD MMM YYYY')}
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
