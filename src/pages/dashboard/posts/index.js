import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableContainer,
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PostsTableRow, PostsTableToolbar } from '../../../sections/@dashboard/posts';
// redux
import { getcategory } from '../../../redux/slices/groups';
import { deletePosts, getPosts } from '../../../redux/slices/posts';
import { useDispatch, useSelector } from '../../../redux/store';

const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'title', label: 'Title', align: 'left', width: 300 },
  { id: 'category', label: 'Category', align: 'left' },
  { id: 'user_type', label: 'User Type', align: 'left' },
  { id: 'posted_by', label: 'Posted By', align: 'left' },
  { id: 'created_at', label: 'Post date', align: 'left' },
  { id: '' },
];

const headers = [
  { key: 'title', label: 'Title' },
  { key: 'postedBy[0]?.name', label: 'Posted By' },
  { key: 'category[0]?.name', label: 'Category' },
  { key: 'created_at', label: 'Post date' },
];

Posts.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Posts() {
  const { dense, page, order, orderBy, rowsPerPage, onChangeDense, onChangePage, onChangeRowsPerPage } = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettings();

  const { push } = useRouter();

  const dispatch = useDispatch();

  const { isLoading, allposts, deleteStatus } = useSelector((state) => state.posts);

  const { categorydata } = useSelector((state) => state.groups);

  console.log('allposts', allposts);

  const [tableData, setTableData] = useState([]);
  const [categoryRole, setCategoryRole] = useState('All');
  const [filterName, setFilterName] = useState('');

  const [getDownload, setGetDownload] = useState([]);

  useEffect(() => {
    setGetDownload(allposts);
  }, [allposts]);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getcategory());
  }, [dispatch]);

  useEffect(() => {
    if (allposts?.length) {
      setTableData(allposts);
    }
  }, [allposts]);

  const handleDeleteRow = (id) => {
    dispatch(deletePosts(id, toast));
    const filterData = tableData.filter((item) => item._id !== id);
    setTableData(filterData);
  };

  const handleEditRow = (id) => {
    push(`/dashboard/posts/add/${id}`);
  };

  const handleonDetail = (id) => {
    push(`/dashboard/posts/detail/${id}`);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    categoryRole,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!isLoading && !dataFiltered.length) ||
    (!dataFiltered.length && !!categoryRole);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const handleCategoryRole = (values) => {
    setCategoryRole(values.target.value);
  };

  return (
    <Page title="Posts">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Posts"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Posts', href: PATH_DASHBOARD.posts.view },
            { name: 'All Posts' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.posts.add} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Add Posts
              </Button>
            </NextLink>
          }
        />
        <Card>
          <PostsTableToolbar
            filterName={filterName}
            onFilterName={handleFilterName}
            headers={headers}
            getDownload={getDownload}
            onCategoryRole={handleCategoryRole}
            CategoryRole={categoryRole}
            allCategory={categorydata}
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
                        <PostsTableRow
                          key={index}
                          row={row}
                          index={index}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
                          onDetail={() => handleonDetail(row._id)}
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

function applySortFilter({ tableData, comparator, filterName, categoryRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (categoryRole !== 'All') {
    tableData = tableData.filter((item) => item.category_id === categoryRole);
  }

  return tableData;
}
