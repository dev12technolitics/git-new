import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box, Button, Card, Container, FormControlLabel, Switch, Table, TableBody, TableContainer,
  TablePagination
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
// sections
import { LeadershipTableRow, LeadershipTableToolbar } from '../../../sections/@dashboard/leadership';

import { deleteLeadership, getLeadership } from '../../../redux/slices/leadership';
import { useDispatch, useSelector } from '../../../redux/store';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: 'Sno', align: 'left' },
  { id: 'profile', label: 'Profile', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'designation', label: 'Designation', align: 'left' },
  { id: '' },
];

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'profile', label: 'Profile' }
];

// ----------------------------------------------------------------------

Leadership.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Leadership() {
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

  const { isLoading, allleadership, deleteStatus } = useSelector((state) => state.leadership);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [getDownload, setGetDownload] = useState([]);

  useEffect(() => {
    setGetDownload(allleadership);
  }, [allleadership]);

  useEffect(() => {
    dispatch(getLeadership());
  }, [dispatch]);

  useEffect(() => {
    if (allleadership?.length) {
      setTableData(allleadership);
    }
  }, [allleadership]);

  const handleEditRow = (id) => {
    console.log("id", id)
    push(`/dashboard/leadership/add/${id}`);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const handleDeleteRow = (id) => {
    dispatch(deleteLeadership(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  return (
    <Page title="Leadership">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Leadership"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Leadership', href: PATH_DASHBOARD.leadership.view },
            { name: 'Leadership List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.leadership.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Leadership
              </Button>
            </NextLink>
          }
        />

        <Card>
          <LeadershipTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            headers={headers}
            getDownload={getDownload}
          />
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
                        <LeadershipTableRow
                          key={index}
                          row={row}
                          index={index}
                          onEditRow={() => handleEditRow(row._id)}
                          onDeleteRow={() => handleDeleteRow(row._id)}
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
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}

