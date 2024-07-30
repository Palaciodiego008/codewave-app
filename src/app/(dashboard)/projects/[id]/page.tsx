'use client';

import { Box, Button, Card, Stack, SxProps, Theme, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetProject } from "../hooks/useGetProject";
import { useParams } from "next/navigation";
import { FormEditor } from "./components/FormEditor/FormEditor";
import Link from "next/link";

const ProjectDetails = () => {
  const params = useParams();
  const { project, getProject } = useGetProject()
  const [file, setFile] = useState<File | null>(null)

  const cardStylesSx: SxProps<Theme> = {
    padding: 4,
    marginTop: 4,
  }

  useEffect(() => {
    const { id } = params

    if (id) {
      getProject(id as string)
    }
  }, [params.id])

  return (
    <Box>
      <Typography variant="h2">Project Details</Typography>

      <Card sx={cardStylesSx}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">{project.title}</Typography>
          <Stack direction='row' spacing={2}>
          <Link href={`/projects/edit/${project?.id}`} passHref>
          <Button variant="contained" color="primary">Edit</Button>
          </Link>
            {/* <Button variant="contained" color='error'>Delete</Button> */}
          </Stack>
        </Box>
      </Card>

      <Card sx={cardStylesSx}>
        <Typography variant="h5">Description</Typography>
        <Typography>{project.description}</Typography>
        <Typography variant="h5" marginTop={4}>Backend: {project.backend ? 'Yes' : 'No'}</Typography>
        <Typography variant="h5">Frontend: {project.frontend ? 'Yes' : 'No'}</Typography>
      </Card>

      <Card sx={cardStylesSx}>
        <FormEditor project={project} />
      </Card>
    </Box>
  )
}

export default ProjectDetails;
