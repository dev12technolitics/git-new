// @mui
import { TableRow, TableCell, Skeleton, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center">
        <Skeleton variant="text" width={20} height={20} />
          <Skeleton variant="rectangular" width={50} height={50} sx={{ borderRadius: 1, flexShrink: 0 }} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
          <Skeleton variant="text" width={160} height={20} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
