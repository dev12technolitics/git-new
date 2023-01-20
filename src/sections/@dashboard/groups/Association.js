import { Box, Card, FormControlLabel, Switch, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
import Layout from '../../../layouts';
import { deletegroups, getassociationsdata } from '../../../redux/slices/groups';
import { useDispatch, useSelector } from '../../../redux/store';
import { AssociationTableRow, GroupsTableToolbarone } from './';

const TABLE_HEAD = [
  { id: 'index', label: 'Sno', align: 'left' },
  { id: 'group_name', label: 'Group Name', align: 'left' },
  { id: 'n_members', label: 'No. Of Members', align: 'left' },
  { id: 'created_at', label: 'Created Date', align: 'left' },
  { id: '' },
];

const headers = [
  { label: 'Group Name', key: 'group_name' },
  { label: 'No. Of Members', key: 'membersCount' },
  { label: 'Created Date', key: 'created_at' },
  { label: 'Created By', key: 'created_by' },
];
// ----------------------------------------------------------------------

Association.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Association() {
  const { dense, page, order, orderBy, rowsPerPage, selected, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable({
      defaultOrderBy: 'createdAt',
    });
  const { push } = useRouter();
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const { isLoading, associationsalldata } = useSelector((state) => state.groups);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [getDownload, setGetDownload] = useState([]);

  useEffect(() => {
    setGetDownload(associationsalldata);
  }, [associationsalldata]);

  useEffect(() => {
    dispatch(getassociationsdata());
  }, [dispatch]);

  useEffect(() => {
    if (associationsalldata?.length) {
      setTableData(associationsalldata);
    }
  }, [associationsalldata]);

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);


  const handledetailRow = (id) => {
    push(`/dashboard/association/detail/${id}`);
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
                  .map((row, index) =>
                    row ? (
                      <AssociationTableRow
                        key={index}
                        row={row}
                        index={index}
                        onDetail={() => handledetailRow(row?._id)}
                        groupId={row?._id}
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
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}
