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
import { useGetProjects } from "./hooks/useGetProjects";

const Projects = () => {
  const { user } = useAuthContext();
  const { projects, getProjects } = useGetProjects();

  useEffect(() => {
    if (!user) return;
    getProjects(user.id);
  }, [user]);

  return (
    <Box>
      <DashboardCard
        title="Projects"
        action={
          <Box component={Link} href={"/projects/new"}>
            <Button variant="contained" color="primary">
              New Project
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
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Description
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Language
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Backend
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Frontend
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
              {projects.map((project) => (
                <TableRow key={project?.id}>
                  <TableCell component="th" scope="row">
                    {project?.id}
                  </TableCell>
                  <TableCell>{project?.title}</TableCell>
                  <TableCell>{project?.description}</TableCell>
                  <TableCell>{project?.languages?.join(",")}</TableCell>
                  <TableCell align="right">
                    {project?.backend ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    {project?.frontend ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/projects/${project?.id}`} passHref>
                      <Button component="a" variant="contained" color="info">
                        View
                      </Button>
                    </Link>
                  </TableCell>

                  <TableCell align="right">
                    <Link href={`/projects/edit/${project?.id}`} passHref>
                      <Button component="a" variant="contained" color="warning">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    </Box>
  );
};

export default Projects;
