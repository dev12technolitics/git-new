import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';

AssociationTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
};

export default function AssociationTableRow({ groupId, row, index, onDetail }) {
  const theme = useTheme();

  const { name, created_at, creater, membersCount } = row;

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
          {name}
        </TableCell>

        <TableCell>
          <a
            href={`/dashboard/association/detail/${groupId}`}
            style={{
              textDecoration: 'none',
              color: 'black',
            }}
          >
            <TableCell align="left" style={{ cursor: 'pointer' }}>
              {membersCount}
            </TableCell>
          </a>
        </TableCell>
        
        <TableCell align="left">{moment(created_at).format('DD MMM YYYY')}</TableCell>
        
        <TableCell align="left" />
      </TableRow>
    </>
  );
}
