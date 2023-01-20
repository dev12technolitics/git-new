import { Checkbox, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Image from '../../../components/Image';

AddnewMembersTableRow.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
};

export default function AddnewMembersTableRow({ row, id, selected, onSelectRow }) {
  const theme = useTheme();
  const {_id, name, profile, association_name, city_name } = row;
console.log("selectedid",selected, _id)
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'left', cursor: 'pointer' }} >
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
      
      <TableCell align="left">{name}</TableCell>


      <TableCell align="left">{association_name}</TableCell>

      <TableCell align="left">{city_name}</TableCell>
    </TableRow>
  );
}
