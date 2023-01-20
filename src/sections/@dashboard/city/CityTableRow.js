import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { MenuItem, TableCell, TableRow } from '@mui/material';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { TableMoreMenu } from '../../../components/table';
import axios from '../../../utils/axios';

CityTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function CityTableRow({ row, index, onEditRow, onDeleteRow }) {
  const theme = useTheme();
  const { push } = useRouter();

  const dispatch = useDispatch();
  const { _id, city_name, image, city_status } = row;
 
  const [openMenu, setOpenMenuActions] = useState(null);
  const [statusPage, setStatusPage] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  useEffect(() => {
    if (city_status == 'Active') {
      setStatusPage('Active');
    } else {
      setStatusPage('InActive');
    }
  }, [city_status]);

  const onSubmit = async (data) => {
    setStatusPage(data);
    const payload = {
      city_status: data,
    };
    const response = await axios.put('/city/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left">{city_name}</TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left', cursor: 'pointer' }} >
        {image ? (
          <Image disabledEffect alt={city_name} src={image} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
        ) : (
          <Image
            disabledEffect
            alt={city_name}
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
          />
        )}
      </TableCell>

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
