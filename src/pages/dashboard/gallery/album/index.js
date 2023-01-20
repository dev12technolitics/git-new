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
import { useDispatch, useSelector } from '../../../../redux/store';
import { getGallerysAll, deletegallery } from '../../../../redux/slices/gallery';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';
// layouts
import Layout from '../../../../layouts';
// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { TableNoData, TableSkeleton, TableEmptyRows, TableHeadCustom } from '../../../../components/table';
import { AlbumTableRow } from '../../../../sections/@dashboard/gallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useLocales from '../../../../hooks/useLocales';

Gallery.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Gallery() {
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

  const { translate, currentLang } = useLocales();

  const TABLE_HEAD = [
    { id: 'index', label: "sno", align: 'left' },
    { id: 'images ', label: "Posts Image", align: 'left' },
    { id: 'title ', label: "Title", align: 'left' },
    { id: 'date ', label: "Date", align: 'left' },
    { id: '' },
  ];

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, galleryes } = useSelector((state) => state.gallery);

  console.log('gallerys', galleryes);

  const [tableData, setTableData] = useState([]);

  const [filterName] = useState('');

  useEffect(() => {
    dispatch(getGallerysAll());
  }, [dispatch]);

  useEffect(() => {
    if (galleryes?.length) {
      setTableData(galleryes);
    }
  }, [galleryes]);

  const handleEditRow = (id) => {
    push(`/dashboard/gallery/album/add/${id}`);
  };

  const handleDeleteRow = (id) => {
    dispatch(deletegallery(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  return (
    <Page title="Album">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Album"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Album", href: PATH_DASHBOARD.album.view },
            { name: "Album List" },
          ]}
          action={
            <NextLink href={'/dashboard/gallery/album/add'} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
         Add Album
              </Button>
            </NextLink>
          }
        />

        <Card>
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
                        <AlbumTableRow
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
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}
