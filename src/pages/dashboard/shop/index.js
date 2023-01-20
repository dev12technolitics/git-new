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
import { ShopTableRow, ShopTableToolbar } from '../../../sections/@dashboard/shop';

import { useDispatch, useSelector } from '../../../redux/store';
import { deleteShop, getShop } from '../../../redux/slices/shop';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'image', label: 'IMAGE', align: 'left' },
  { id: 'title', label: 'TITLE', align: 'left' },
  { id: 'backlink', label: 'BACKLINK', align: 'left' },
  { id: '' },
];

const headers = [
  { label: 'TITLE', key: 'title' },
  { label: 'BACK LINK', key: 'backlink' },
];
// ----------------------------------------------------------------------

Shop.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Shop() {
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

  const { isLoading, allshop } = useSelector((state) => state.shop);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [getDownload, setGetDownload] = useState([]);

  useEffect(() => {
    setGetDownload(allshop);
  }, [allshop]);

  useEffect(() => {
    dispatch(getShop());
  }, [dispatch]);

  useEffect(() => {
    if (allshop.length) {
      setTableData(allshop);
    }
  }, [allshop]);


  const handleDeleteRow = (id) => {
    dispatch(deleteShop(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  const handleEditRow = (id) => {
    push(`/dashboard/shop/add/${id}`);
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


  return (
    <Page title="Shop">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Shop"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Shop', href: PATH_DASHBOARD.shop.view },
            { name: 'All Shop' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.shop.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Shop
              </Button>
            </NextLink>
          }
        />

        <Card>
          
          <ShopTableToolbar
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
                        <ShopTableRow
                          key={index}
                          row={row}
                          index={index}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
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
        item.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
    );
  }
  return tableData;
}
