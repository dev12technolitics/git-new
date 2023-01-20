import { Box, Card, FormControlLabel, Switch, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GroupsTableRow, GroupsTableToolbarone } from '.';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
import Layout from '../../../layouts';
import { deletegroups, getgroupsdata } from '../../../redux/slices/groups';
import { useDispatch, useSelector } from '../../../redux/store';

const TABLE_HEAD = [
  { id: 'index', label: 'Sno', align: 'left' },
  { id: 'group_name', label: 'Group Name', align: 'left' },
  { id: 'n_members', label: 'No. Of Members', align: 'left' },
  { id: 'created_at', label: 'Created Date', align: 'left' },
  { id: 'created_by', label: 'Created By', align: 'left' },
  { id: '' },
];

const headers = [
  { label: 'Group Name', key: 'group_name' },
  { label: 'No. Of Members', key: 'membersCount' },
  { label: 'Created Date', key: 'created_at' },
  { label: 'Created By', key: 'created_by' },
];
// ----------------------------------------------------------------------

Groups.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Groups() {
  const { dense, page, order, orderBy, rowsPerPage, selected, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable({
      defaultOrderBy: 'createdAt',
    });
  const { push } = useRouter();
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { isLoading, groupsalldata } = useSelector((state) => state.groups);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [getDownload, setGetDownload] = useState([]);
 
  useEffect(() => {
    setGetDownload(groupsalldata);
  }, [groupsalldata]);

  useEffect(() => {
    dispatch(getgroupsdata());
  }, [dispatch]);

  useEffect(() => {
    if (groupsalldata?.length) {
      setTableData(groupsalldata);
    }
  }, [groupsalldata]);

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const handleDeleteRow = (id) => {
    dispatch(deletegroups(id, toast));
    const filterData = tableData.filter((item) => item.groupId !== id);
    setTableData(filterData);
  };

  const handledetailRow = (id) => {
    push(`/dashboard/groups/detail/${id}`);
  };

  const handleEditRow = (id) => {
    push(`/dashboard/groups/add/${id}`);
  };

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  return (
    <>
      <Card>
        <GroupsTableToolbarone
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
                  .filter((item) => item?.groupId != '6394311db1c70d79641dac09')
                  .map((row, index) =>
                    row ? (
                      <GroupsTableRow
                        key={index}
                        row={row}
                        index={index}
                        onEditRow={() => handleEditRow(row?.groupId)}
                        onDeleteRow={() => handleDeleteRow(row?.groupId)}
                        onDetail={() => handledetailRow(row?.groupId)}
                        groupId={row?.groupId}
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
    tableData = tableData.filter((item) => item.group_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}
