import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import DashboardCard from "../components/shared/DashboardCard";

const Users = () => {
  return (
    <Box>
      <DashboardCard
        title="Users"
        action={<Button variant="contained" color="primary">New User</Button>}
      >
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Email
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    </Box>
  );
}

export default Users;
