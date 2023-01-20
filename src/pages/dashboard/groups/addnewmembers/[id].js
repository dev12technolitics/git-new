import { useEffect, useState } from 'react';
// next
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
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useSettings from '../../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../../hooks/useTable';
// layouts
import Layout from '../../../../layouts';
// components
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
  TableSkeleton
} from '../../../../components/table';

import { getOnegroup, putgroupsMemberUpdate } from '../../../../redux/slices/groups';
import { getmembers } from '../../../../redux/slices/members';
import { useDispatch, useSelector } from '../../../../redux/store';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddnewMembersTableRow, AddnewMembersTableToolbar } from '../../../../sections/@dashboard/groups';

const TABLE_HEAD = [
  { id: 'profile', label: 'Profile', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'association', label: 'Association', align: 'left' },
  { id: 'city', label: 'City', align: 'left' },
];

AddNewembersDetail.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function AddNewembersDetail() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
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

  const { isLoading, allmembers } = useSelector((state) => state.member);
  const { onegroup } = useSelector((state) => state.groups);

  const [tableData, setTableData] = useState([]);
  const [mambersData, setMambersData] = useState([]);
  const [filterName, setFilterName] = useState('');

  const { query } = useRouter();
  const { id } = query;

  useEffect(() => {
    dispatch(getOnegroup(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getmembers());
  }, [dispatch]);

  useEffect(() => {
    if (allmembers?.length) {
      setTableData(allmembers);
    }
  }, [allmembers]);

  useEffect(() => {
    const membersIds = []
    if (onegroup?.length) {      
      onegroup?.map((item) => {
        membersIds.push(item?.members?._id)
      })
      onSelectRow(membersIds);
      setMambersData(membersIds)
    }
  }, [onegroup]);

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

  const onSubmit = () => {
    const payload = {
      groupId: id,
      members: [...new Set(selected)],
      memberDelete: mambersData.filter(item => ![...new Set(selected)].includes(item)),
    };
    dispatch(putgroupsMemberUpdate(payload, toast, push));
  };

  console.log("selected", onegroup )

  return (
    <Page title="Members">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Add New Members"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Group Management', href: PATH_DASHBOARD.groups.view },
            { name: 'Members List' },
          ]}
        />

        <Card>
          <AddnewMembersTableToolbar filterName={filterName} onFilterName={handleFilterName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={[...new Set(selected)].length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row?._id)
                    )
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={[...new Set(selected)].length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row?._id)
                    )
                  }
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <AddnewMembersTableRow
                          key={index}
                          row={row}
                          index={index}
                          selected={[...new Set(selected)].includes(row._id)}
                          onSelectRow={() => onSelectRow(row._id)}
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
              rowsPerPageOptions={[5, 10, 25]}
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

        <Box sx={{ position: 'relative', m: 4 }}>
          <Button variant="contained" onClick={() => onSubmit()} style={{ float: 'right' }}>
            Add Member
          </Button>
        </Box>
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
        item?.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.association_name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.city_name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return tableData;
}
