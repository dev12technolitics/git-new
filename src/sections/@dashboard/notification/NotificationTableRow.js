import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// @mui
import { MenuItem, Select, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// utils
import Iconify from '../../../components/Iconify';
import { TableMoreMenu } from '../../../components/table';
import { putNotifications } from '../../../redux/slices/notification';
//
import moment from 'moment';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from '../../../utils/axios';
// ----------------------------------------------------------------------

NotificationTableRow.propTypes = {
  row: PropTypes.object,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDetail: PropTypes.func,
};

export default function NotificationTableRow({ row, index, onEditRow, onDeleteRow ,onDetail}) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { _id, noti_title, status, created_at } = row;
  const [openMenu, setOpenMenuActions] = useState(null);
  const [statusPage, setStatusPage] = useState(null);

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
    const response = await axios.put('/notification/update/' + _id, payload);
    if (response.data?.status == true) {
      toast.success(response.data?.message);
    } else {
      toast.error(response.data?.message);
    }
  };

  return (
    <TableRow hover >
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell onClick={() => onDetail()}  style={{ cursor: 'pointer' }}>{noti_title}</TableCell>

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

      <TableCell align="left" >{moment(created_at).format('DD MMM YYYY')}</TableCell>

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
