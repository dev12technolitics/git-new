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
import { MembersTableRow, MembersTableToolbar } from '../../../sections/@dashboard/members';

import { deletemembers, getmembers } from '../../../redux/slices/members';
import { useDispatch, useSelector } from '../../../redux/store';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: 'Sno', align: 'left' },
  { id: 'narid', label: 'Id', align: 'left' },
  { id: 'profile', label: 'Profile', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'association', label: 'Association', },
  { id: 'nar_designation', label: 'Designation', align: 'left' },
  { id: 'city_name', label: 'City', align: 'left' },
  { id: 'contact_no', label: 'Contact No', align: 'left' },
  { id: 'email_id', label: 'Email Id', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

const headers = [
  { label: 'name', key: 'name' },
  { label: 'Id', key: 'narid' },
  { label: 'Profile', key: 'profile' },
  { label: 'Association', key: 'association' },
  { label: 'Designation', key: 'nar_designation' },
  { label: 'City', key: 'city_name' },
  { label: 'Contact No', key: 'contact_no' },
  { label: 'Email Id', key: 'email_id' },
  { label: 'status', key: 'Status' },
];
// ----------------------------------------------------------------------

Members.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Members() {
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

  const { isLoading, allmembers, deleteStatus } = useSelector((state) => state.member);

  console.log("allmembers", allmembers);

  const reduxstate = useSelector((state) => state);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [getDownload, setGetDownload] = useState([]);

  useEffect(() => {
    setGetDownload(allmembers);
  }, [allmembers]);

  useEffect(() => {
    dispatch(getmembers());
  }, [dispatch]);


  useEffect(() => {
    if (allmembers?.length) {
      setTableData(allmembers);
    }
  }, [allmembers]);

  const handleEditRow = (id) => {
    push(`/dashboard/members/add/${id}`);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const handleDeleteRow = (id) => {
    dispatch(deletemembers(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  const handledetailRow = (id) => {
    push(`/dashboard/members/detail/${id}`);
  };

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const [filterCity, setFilterCity] = useState('all');


  const handleFilterCity = (event) => {
    setFilterCity(event.target.value.city);
  };

  return (
    <Page title="Members">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Members"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Members', href: PATH_DASHBOARD.members.view },
            { name: 'Members List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.members.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Members
              </Button>
            </NextLink>
          }
        />
        <Card>

          <MembersTableToolbar
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
                    .filter((item) => item?.city == filterCity || filterCity == 'all')
                    .map((row, index) =>
                      row ? (
                        <MembersTableRow
                          key={index}
                          row={row}
                          index={index}
                          onEditRow={() => handleEditRow(row._id)}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onDetail={() => handledetailRow(row._id)}
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

function applySortFilter({ tableData, comparator, filterName, filterCity }) {
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
        item?.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.email_id?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.city_name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.contact_no?.toString().indexOf(filterName) !== -1
    );
  }

  if (filterCity) {
    console.log("tableData", tableData)
    tableData = tableData.filter(
      (item) =>
        item.target.value?.toLowerCase().indexOf(filterCity.toLowerCase()) !== -1
    );

  }

  return tableData;
}

