"use client";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DashboardCard from "../components/shared/DashboardCard";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext/auth.context";
import { useEffect, useState } from "react";
import { useGetOpenApis } from "../api-analysis/hooks/useGetApisAnalysis";
import { OpenApiDto } from "../api-analysis/services/dto/OpenApi.dto";

const exampleOpenApis: OpenApiDto[] = [
  {
    id: 1,
    name: "Example API",
    description: "This is an example API",
    version: "1.0",
    format: "JSON",
    user_id: 1,
    openapi: "openapi",
  },
];

const OpenApiTable = () => {
  const { user } = useAuthContext();
  const { openApis, getOpenApis } = useGetOpenApis();
  const [apisLoaded, setApisLoaded] = useState(false);

  useEffect(() => {
    if (user && !apisLoaded) {
      getOpenApis(user.id).finally(() => {
        setApisLoaded(true);
      });
    }
  }, [user, apisLoaded, getOpenApis]);

  return (
    <Box>
      <DashboardCard
        title="OpenAPIs"
        action={
          <Box component={Link} href={"/api-analysis/new"}>
            <Button variant="contained" color="primary">
              New OpenAPI
            </Button>
          </Box>
        }
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
                    Description
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Version
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Format
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(openApis) && openApis.length > 0 ? (
                openApis.map((openApi: OpenApiDto) => (
                  <TableRow key={openApi.id}>
                    <TableCell component="th" scope="row">
                      {openApi.id}
                    </TableCell>
                    <TableCell>{openApi.name}</TableCell>
                    <TableCell>{openApi.description}</TableCell>
                    <TableCell>{openApi.version}</TableCell>
                    <TableCell>{openApi.format}</TableCell>
                    <TableCell align="right">
                      <Link href={`/api-analysis/${openApi.id}`} passHref>
                        <Button component="a" variant="contained" color="info">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="body1" align="center">
                      No OpenAPIs found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default OpenApiTable;
