import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Iconify from '../../../components/Iconify';
import Image from '../../../components/Image';
import { TableMoreMenu } from '../../../components/table';

LeadershipTableRow.propTypes = {
    row: PropTypes.object,
    index: PropTypes.number,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
};

export default function LeadershipTableRow({ row, index, selected, onEditRow, onDeleteRow }) {
    const theme = useTheme();

    const { name, image, designations } = row;

    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected}>
            <TableCell align="left">{index + 1}</TableCell>

            <TableCell sx={{ display: 'flex', alignItems: 'left' }}>
                <Image
                    disabledEffect
                    alt={name}
                    src={image}
                    sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }}
                />
            </TableCell>

            <TableCell align="left" >
                {name}
            </TableCell>


            <TableCell align="left">{designations[0]?.designation_name}</TableCell>

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
