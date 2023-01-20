import { Button, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment-timezone';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import useAuth from '../../../../src/hooks/useAuth';

FeedbackTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function FeedbackTableRow({ row, index , onDetail}) {

  var utc = 1502212611;
  const theme = useTheme();
  const { user } = useAuth();

  const { subject, created_at, postedBy, attachment } = row;

  const [openMenu, setOpenMenuActions] = useState(null);


  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>

      <TableCell align="left">{index + 1}</TableCell>

      <TableCell onClick={() => onDetail()} style={{ cursor: 'pointer' }}> <Typography variant="subtitle2" noWrap>
        {subject}
      </Typography></TableCell>

      <TableCell align="left" onClick={() => onDetail()} style={{ cursor: 'pointer' }}>
        {postedBy}
      </TableCell>

      <TableCell align="left">
        {moment(created_at).utc().format('DD-MMM-YYYY')}
      </TableCell>

      <TableCell align="left">
        {moment(created_at).tz("Asia/Calcutta").format('hh:mm:ss')}
      </TableCell>

      <TableCell align="left">
        <Link href={attachment} target="_blank" download={attachment} style={{ textDecoration: 'none' }}>
          <Button variant="contained">
          Download
          </Button>
        </Link>
      </TableCell>

    </TableRow>
  );
}
