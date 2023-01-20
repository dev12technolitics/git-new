import PropTypes from 'prop-types';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem } from '@mui/material';
// utils
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
// ----------------------------------------------------------------------

DeveloperTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number, 
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function DeveloperTableRow({ row, index, onDeleteRow, onEditRow, onDetails }) {
  const theme = useTheme();
  
  const { company_name, dev_contact, dev_email, dev_website, dev_active } = row;

  const [openMenu, setOpenMenuActions] = useState(null);
  
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover >
      <TableCell align="left">{index + 1}</TableCell>
      <TableCell onClick={() => onDetails()}>{company_name}</TableCell>
      <TableCell>{dev_contact}</TableCell>
      <TableCell>{dev_email}</TableCell>
      <TableCell>{dev_website}</TableCell>
      
       <TableCell align="right">
          <Label 
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={
              (row.dev_active === 'Active' && 'success') ||
              (row.dev_active === 'In Active' && 'warning') ||
              'error'
            }
          >
            {row.dev_active}
          </Label>
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
