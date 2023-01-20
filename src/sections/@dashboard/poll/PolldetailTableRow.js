import PropTypes from 'prop-types';
// @mui
import { TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';

PollTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onDetail: PropTypes.func,
};

export default function PollTableRow({ row, index }) {
  const theme = useTheme();

  const { _id, option } = row;

  console.log(index);

  return (
    <TableRow hover >
      <TableCell align="left">{index + 1}</TableCell>

      <TableCell align="left" >{option}</TableCell>

      <TableCell align="left" />
      
      <TableCell align="left" />

    </TableRow>
  );
}
