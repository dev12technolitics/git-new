import { useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import {
  Box,
  Card, Container, DialogTitle, FormControlLabel, Switch, Table, TableBody, TableContainer,
  TablePagination
} from '@mui/material';
// redux

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
// layouts
import Layout from '../../../layouts';
// components
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DialogAnimate } from '../../../components/animate';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import {
  TableEmptyRows,
  TableHeadCustom, TableNoData,
  TableSkeleton
} from '../../../components/table';
import { closeModal, openModal } from '../../../redux/slices/calendar';
import { getMembershipEnquiry } from '../../../redux/slices/membershipenquiry';
import { useDispatch, useSelector } from '../../../redux/store';
import { DetailsForm, MembershipenquiryTableRow } from '../../../sections/@dashboard/membershipenquiry';

const TABLE_HEAD = [
  { id: 'index', label: 'SNO', align: 'left' },
  { id: 'name', label: 'NAME', align: 'left' },
  { id: 'email_id', label: 'EMAIL ID', align: 'left' },
  { id: 'contact_no', label: 'CONTACT NO', align: 'left' },
  { id: 'city', label: 'CITY', align: 'left' },
  { id: 'created_at', label: 'DATE', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

Membershipenquiry.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Membershipenquiry() {
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

  const { isLoading, allEnquiry } = useSelector((state) => state.membershipenquiry);

  const [tableData, setTableData] = useState([]);

  const [filterName] = useState('');

  useEffect(() => {
    dispatch(getMembershipEnquiry());
  }, [dispatch]);

  useEffect(() => {
    if (allEnquiry.length) {
      setTableData(allEnquiry);
    }
  }, [allEnquiry]);

  console.log("allEnquiry", allEnquiry)


  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);


  const [onChangeData, setOnChangeData] = useState({});

  const { isOpenModal } = useSelector((state) => state.calendar);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleAddEvent = (value) => {
    setOnChangeData({
      remarks: value?.remarks || ""
    })
    dispatch(openModal());
  };


  return (
    <Page title="Membership Enquiry">
      <ToastContainer />
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Membership Enquiry"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Membership Enquiry', href: PATH_DASHBOARD.membershipenquiry.view },
            { name: 'All Membership Enquiry' },
          ]}

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
                        <MembershipenquiryTableRow
                          key={index}
                          row={row}
                          index={index}
                          onOpenDialog={() => handleAddEvent(row)}
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

      <DialogAnimate maxWidth='sm' open={isOpenModal} onClose={handleCloseModal}>
        <DialogTitle>Details</DialogTitle>
        <DetailsForm remarks={onChangeData?.remarks} onCancel={handleCloseModal} />
      </DialogAnimate>
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
