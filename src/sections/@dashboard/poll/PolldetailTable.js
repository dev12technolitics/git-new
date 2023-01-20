import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import {
    Box,
    Card, FormControlLabel, Switch, Table, TableBody, TableContainer,
    TablePagination
} from '@mui/material';
// redux
import { getPoll } from '../../../redux/slices/poll';
import { useDispatch, useSelector } from '../../../redux/store';
// routes
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
// layouts
import 'react-toastify/dist/ReactToastify.css';
import Scrollbar from '../../../components/Scrollbar';
import {
    TableEmptyRows,
    TableHeadCustom, TableNoData,
    TableSkeleton
} from '../../../components/table';
import Layout from '../../../layouts';
import PolldetailTableRow from './PolldetailTableRow';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'index', label: 'SNO', align: 'left' },
    { id: 'title', label: 'Option', align: 'left' },
    { id: 'title', label: 'Total Vote In No.', align: 'left' },
    { id: 'created_at', label: 'Total Vote In %', align: 'left' },
    { id: '' },
];

PolldetailTable.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function PolldetailTable({pollData}) {

    console.log("pollData",pollData)

    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        selected,
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({
        defaultOrderBy: 'createdAt',
    });

    const { themeStretch } = useSettings();

    const { push } = useRouter();

    const dispatch = useDispatch();


    const { isLoading, Allpoll } = useSelector((state) => state.poll);

    const [tableData, setTableData] = useState([]);

    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        dispatch(getPoll());
    }, [dispatch]);

    useEffect(() => {
        if (pollData?.userPoll?.length) {
            console.log("pollData?.userPoll?.length",pollData?.userPoll?.length)
            setTableData(pollData?.userPoll);
        }
    }, [pollData]);
    console.log("pollData?.userPoll", pollData?.userPoll)

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);


    return (
        <>
            
                <Card sx={{mt:5}} >
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                />
                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <PolldetailTableRow
                                                    key={index}
                                                    row={row}
                                                    index={index}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                                            )
                                        )}

                                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Box sx={{ position: 'relative' }}>
                        <TablePagination
                            // rowsPerPageOptions={[5, 10, 25]}
                            rowsPerPageOptions={[100, 200, 300, 400, 500]}
                            component="div"
                            count={dataFiltered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />

                        <FormControlLabel
                            control={<Switch checked={dense} onChange={onChangeDense} />}
                            label="Dense"
                            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
                        />
                    </Box>
                </Card>
          
        </>
    );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
    const stabilizedThis = tableData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        tableData = tableData.filter(
            (item) =>
                item.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    return tableData;
}
