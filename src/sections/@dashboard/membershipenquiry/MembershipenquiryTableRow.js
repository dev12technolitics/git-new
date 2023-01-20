import { TableCell, TableRow } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';

MembershipenquiryTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function MembershipenquiryTableRow({ row, index, onOpenDialog }) {
  const { your_name, email_id, contact_no, city , created_at} = row;

  console.log('first::::::>>', row);

  const onOpenDialogBox = () => {
    onOpenDialog();
  };

  return (
    <TableRow hover>
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left" onClick={() => onOpenDialogBox()} sx={{ cursor: 'pointer' }}>
        {your_name}
      </TableCell>

      <TableCell align="left">{email_id}</TableCell>

      <TableCell align="left">{contact_no}</TableCell>

      <TableCell align="left">{city}</TableCell>

      <TableCell align="left">  {moment(created_at).format('DD MMM YYYY')}</TableCell>
      
    </TableRow>
  );
}
