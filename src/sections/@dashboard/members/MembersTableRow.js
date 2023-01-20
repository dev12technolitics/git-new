import { MenuItem, TableCell, TableRow } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { TableMoreMenu } from '../../../components/table';
import axios from '../../../utils/axios';

MembersTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function MembersTableRow({ row, index, selected, onEditRow, onDeleteRow, onDetail }) {
  const { _id, narid, name, profile, city_name, contact_no, email_id, designation_name, status , association_name} = row;

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
    const response = await axios.put('/adminuser/updateStatus/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
        {narid}
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left', cursor: 'pointer' }} onClick={() => onDetail()}>
        {profile ? (
          <Image disabledEffect alt={name} src={profile} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
        ) : (
          <Image
            disabledEffect
            alt={name}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
          />
        )}
      </TableCell>

      <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
        {name}
      </TableCell>

      <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
        {association_name}
      </TableCell>

      <TableCell align="left">{designation_name}</TableCell>

      <TableCell align="left">{city_name}</TableCell>

      <TableCell align="left">{contact_no}</TableCell>

      <TableCell align="left">{email_id}</TableCell>
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
