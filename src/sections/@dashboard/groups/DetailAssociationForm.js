import { Box, Card, FormControlLabel, Switch, Table, TableBody, TableContainer, TablePagination } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scrollbar from '../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSkeleton } from '../../../components/table';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
import Layout from '../../../layouts';
import { putgroupsMemberDelete } from '../../../redux/slices/groups';
import { useDispatch, useSelector } from '../../../redux/store';
import AssociationDetailTableRow from './AssociationDetailTableRow';
import AssociationTableToolbar from './AssociationTableToolbar';

const TABLE_HEAD = [
  { id: 'index', label: 'Sno', align: 'left' },
  { id: 'project', label: 'Profile', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'association', label: 'Association', align: 'left' },
  { id: 'designation', label: 'Designation', align: 'left' },
];

// ----------------------------------------------------------------------

DetailGroupForm.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DetailGroupForm({ groupData, isLoading, id, memberData }) {
  const { dense, page, order, orderBy, rowsPerPage, selected, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable({
      defaultOrderBy: 'createdAt',
    });
  const { push } = useRouter();

  const [tableData, setTableData] = useState([]);
  const [memberDatas, setMemberDatas] = useState([]);
  const [filterName, setFilterName] = useState('');
  const dispatch = useDispatch();
  const { addcity } = useSelector((state) => state.groups);

  useEffect(() => {
    if (groupData?.length) {
      setTableData(groupData);
    }
  }, [groupData]);

  useEffect(() => {
    if (memberData?.length) {
      setMemberDatas(memberData);
    }
  }, [memberData]);

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

  const onSubmit = (ids) => {
    const array = tableData.filter((item) => item?._id != ids);
    setTableData(array);
    dispatch(putgroupsMemberDelete(ids, toast));
  };

  return (
    <>
      <ToastContainer />
      <Card>
        <AssociationTableToolbar filterName={filterName} onFilterName={handleFilterName} id={id} />
        
        <Scrollbar>
          <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHeadCustom headLabel={TABLE_HEAD} rowCount={tableData.length} />
              <TableBody>
                {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) =>
                    row ? (
                      <AssociationDetailTableRow key={index} row={row} index={index} onSubmit={() => onSubmit(row?._id)} />
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
    tableData = tableData.filter(
      (item) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.designations?.designation_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.associations?.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 
    );
  }
  return tableData;
}
