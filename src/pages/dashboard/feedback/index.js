
import { useEffect, useState } from 'react';
// @mui
import {
    Box,
    Card, Container, FormControlLabel, Switch, Table, TableBody, TableContainer,
    TablePagination
} from '@mui/material';



import { useRouter } from 'next/router';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import {
    TableEmptyRows,
    TableHeadCustom, TableNoData,
    TableSkeleton
} from '../../../components/table';
// sections
import { FeedbackTableRow } from '../../../sections/@dashboard/feedback';

import { ToastContainer } from 'react-toastify';
import { getFeedbacks } from '../../../redux/slices/feedback';
import { useDispatch, useSelector } from '../../../redux/store';

import useAuth from '../../../../src/hooks/useAuth';

const TABLE_HEAD = [
    { id: 'index', label: 'SNO', align: 'left' },
    { id: 'subject', label: 'SUBJECT', align: 'left' },
    { id: 'postedBy', label: 'POSTED BY', align: 'left' },
    { id: 'date', label: 'DATE', align: 'left' },
    { id: 'time', label: 'TIME', align: 'left' },
    { id: '', label: 'Attachment', align: 'left' },
];

Contact.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default function Contact() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({
        defaultOrderBy: 'createdAt',
    });

    const { themeStretch } = useSettings();

    const dispatch = useDispatch();

    const { user } = useAuth();

    const { isLoading, feedbacks } = useSelector((state) => state.feedback);

    const { push } = useRouter();
    const [tableData, setTableData] = useState([]);
    const [filterName, setFilterName] = useState('');

    useEffect(() => {
        dispatch(getFeedbacks());
    }, [dispatch]);

    useEffect(() => {
        if (feedbacks?.length) {
            setTableData(feedbacks);
        }
    }, [feedbacks]);

    console.log("feedbacks", feedbacks)

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

    const handledetailRow = (id) => {
        push(`/dashboard/feedback/detail/${id}`);
      };

    return (
        <Page title="Feedback">
            <ToastContainer />
            <Container maxWidth={themeStretch ? false : 'lg'}>

                <HeaderBreadcrumbs
                    heading="Feedback List"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Feedback', href: PATH_DASHBOARD.feedback.view },
                        { name: 'Feedback List' },
                    ]}
                />
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length} />
                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <FeedbackTableRow
                                                    key={index}
                                                    row={row}
                                                    index={index}
                                                    onDetail={() => handledetailRow(row?._id)}
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
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

// function applySortFilter({ tableData, comparator, filterName }) {
//     const stabilizedThis = tableData.map((el, index) => [el, index]);

//     stabilizedThis.sort((a, b) => {
//         const order = comparator(a[0], b[0]);
//         if (order !== 0) return order;
//         return a[1] - b[1];
//     });

//     tableData = stabilizedThis.map((el) => el[0]);

//     if (filterName) {
//         tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
//     }

//     return tableData;
// }


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
                item.contact_name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                item.contact_contact?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                item.contact_city?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
                item.contact_email?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    return tableData;
}