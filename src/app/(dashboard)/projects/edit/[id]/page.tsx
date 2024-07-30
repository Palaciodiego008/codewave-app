'use client';

import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ProjectDto } from "../../services/dto/Project.dto";
import { useAuthContext } from "@/context/AuthContext/auth.context";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import { useGetProject } from "../../hooks/useGetProject";

const languages = [
  'Javascript',
  'Typescript',
  'Python',
  'Java',
  'Ruby',
  'Go',
  'C#',
  'C++',
  'PHP',
  'Swift',
  'Kotlin',
  'Rust',
];

const EditProject = () => {
  const params = useParams();
  const router = useRouter();
  const { project, getProject } = useGetProject();
  const { updateProject } = useUpdateProject();
  const [projectData, setProjectData] = useState<ProjectDto>({
    id: '',
    title: '',
    description: '',
    languages: [],
    backend: false,
    frontend: false,
    user_id: '',
    snapshot_code: ''
  });

  useEffect(() => {
    const { id } = params;
    if (id) {
      getProject(id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (project) {
      setProjectData(prev => ({
        ...project,
        languages: project.languages || []
      }));
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProjectData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setProjectData(prev => ({
      ...prev,
      languages: typeof value === 'string' ? value.split(',') : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectData.id) {
      updateProject(projectData.id, projectData)
        .then(() => {
          toast.success('Project updated successfully');
          router.push('/projects');
        })
        .catch(() => {
          toast.error('Error updating project');
        });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ padding: 4 }}>
      <Typography variant="h4">Edit Project</Typography>
      <TextField
        name="title"
        label="Title"
        value={projectData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="description"
        label="Description"
        value={projectData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="language">Language</InputLabel>
          <Select
            labelId="language"
            id="language"
            multiple
            value={projectData.languages}
            input={<OutlinedInput label="Language" />}
            renderValue={(selected) => selected.join(', ')}
            label="Language"
            onChange={handleSelectChange}
          >
            {languages.map((language, index) => (
              <MenuItem key={index} value={language}>
                <Checkbox checked={projectData?.languages?.indexOf(language) > -1} />
                <ListItemText primary={language} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={projectData.backend} onChange={handleChange} name="backend" />}
          label="Backend"
        />
        <FormControlLabel
          control={<Checkbox checked={projectData.frontend} onChange={handleChange} name="frontend" />}
          label="Frontend"
        />
      </FormGroup>
      <Box marginTop={2}>
        <Button type="submit" variant="contained" color="primary">
          Update Project
        </Button>
      </Box>
    </Box>
  );
};

export default EditProject;
