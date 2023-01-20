import { useState, useEffect } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getcity , deleteCity} from '../../../redux/slices/city';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
} from '../../../components/table';
// sections
import { CityTableRow , CityTableToolbar } from '../../../sections/@dashboard/city';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'city_name', label: 'CITY NAME', align: 'left' },
  { id: 'image', label: 'Icon', align: 'left' },
  { id: 'city_status', label: 'STATUS', align: 'left' },
  { id: '' },
];

const headers = [
  { key: 'city_name', label: 'CITY NAME' },
  { key: 'image', label: 'Icon' },
  { key: 'city_status', label: 'STATUS' },
];

// ----------------------------------------------------------------------

City.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function City() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, cityall } = useSelector((state) => state.city); 

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');
 
  const [getDownload, setGetDownload] = useState([]);

  useEffect(() => {
    setGetDownload(cityall);
  }, [cityall]);

  useEffect(() => {
    dispatch(getcity());
  }, [dispatch]);

  useEffect(() => {
    if (cityall?.length) {
      setTableData(cityall);
    }
  }, [cityall]);


  const handleEditRow = (id) => {
    push(`/dashboard/city/add/${id}`);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteCity(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  return (
    <Page title="City">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="City"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'City', href: PATH_DASHBOARD.city.view },
            { name: 'City List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.city.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add City
              </Button>
            </NextLink> 
          }
        />
        <Card>
          <CityTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            headers={headers}
            getDownload={getDownload}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length} />
                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <CityTableRow
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
        item.city_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
    );
  }

  return tableData;
}
