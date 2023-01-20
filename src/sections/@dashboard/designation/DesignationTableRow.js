import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { MenuItem, TableCell, TableRow } from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
// utils
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import axios from '../../../utils/axios';

DesignationTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function DesignationTableRow({ row, index, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { push } = useRouter();

  const dispatch = useDispatch();
  const { _id, status, designation_name } = row;

  console.log("row", row)

  const [openMenu, setOpenMenuActions] = useState(null);
  const [statusPage, setStatusPage] = useState(null);
  console.log(index);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  useEffect(() => {
    if (status == 'Active') {
      setStatusPage('Active');
    } else {
      setStatusPage('InActive');
    }
  }, [status]);

  const onSubmit = async (data) => {
    setStatusPage(data);
    const payload = {
      status: data,
    };
    const response = await axios.put('/commondesignations/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">{designation_name}</TableCell>

      <TableCell align="left">

        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          onChange={(e) => onSubmit(e.target.value)}
          value={statusPage}
          sx={{ height: '40px', width: 120 }}
        >
          <MenuItem value={'Active'}>Active</MenuItem>
          <MenuItem value={'InActive'}>InActive</MenuItem>
        </Select>

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
