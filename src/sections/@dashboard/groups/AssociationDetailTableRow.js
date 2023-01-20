import PropTypes from 'prop-types';
import Select from '@mui/material/Select';
import { Button, TableCell, TableRow, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../../redux/store';
import { getDesignationStatus } from '../../../redux/slices/designation';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

AssociationDetailTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function AssociationDetailTableRow({ row, index, onSubmit }) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { designationsallstatus } = useSelector((state) => state.designationnar);

  useEffect(() => {
    dispatch(getDesignationStatus());
  }, [dispatch]);

  const { _id, members, designation, associations } = row;

  const [statusPage, setStatusPage] = useState("");

  useEffect(() => {
    if (designation) {
      setStatusPage(designation?._id);
    }
  }, [designation]);

  const ondesignationsSubmit = async (data) => {
    setStatusPage(data);
    const payload = {
      designationId: data,
    };
    const response = await axios.put('/groupmember/update/' + _id, payload);
    toast.success(response.data?.message);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{index + 1}</TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'left', cursor: 'pointer' }} >
          {members?.profile ? (
            <Image disabledEffect alt={members?.name} src={members?.profile} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
          ) : (
            <Image
              disabledEffect
              alt={members?.name}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
            />
          )}
        </TableCell>


        <TableCell>{members?.name}</TableCell>

        <TableCell align="left">{members?.associations?.map((item) => (
          <div key={item?._id}>{item?.name}</div>
        ))}</TableCell>
        {/* <TableCell align="left">{designation?.designation_name}</TableCell> */}
        <TableCell align="left">
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={(e) => ondesignationsSubmit(e.target.value)}
            value={statusPage}
            sx={{ height: '40px', width: 120 }}
          >
            {designationsallstatus.map((option, index) => (
              <MenuItem key={index} value={option?._id}>{option.designation_name}</MenuItem>
            ))}
          </Select>
        </TableCell>
      </TableRow>
    </>
  );
}
