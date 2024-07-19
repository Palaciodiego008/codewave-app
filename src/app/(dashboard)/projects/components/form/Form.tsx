'use client'

import CustomTextField from "@/app/(dashboard)/components/forms/theme-elements/CustomTextField"
import { Button, Card, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { ProjectDto } from "../../services/dto/Project.dto"

interface FormProjectsProps {
  title: string
  project: ProjectDto
  setProject: Dispatch<SetStateAction<ProjectDto>>
  action: (e: any) => void
}

export const FormProjects = ({ title, project, setProject, action }: FormProjectsProps) => {
  const languages = [
    { title: 'Javascript' },
    { title: 'Typescript' },
    { title: 'Python' },
    { title: 'Java' },
    { title: 'Ruby' },
    { title: 'Go' },
    { title: 'C#' },
    { title: 'C++' },
    { title: 'PHP' },
    { title: 'Swift' },
    { title: 'Kotlin' },
    { title: 'Rust' },
  ]

  return (
    <form onSubmit={action}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              name="title"
              fullWidth
              label="Title"
              variant="outlined"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="language">Language</InputLabel>
              <Select
                labelId="language"
                id="language"
                value={project.language}
                label="Language"
                onChange={(e: any) => setProject({ ...project, language: e.target.value })}
              >
                {languages.map((language, index) => (
                  <MenuItem key={index} value={language.title}>{language.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={4}>
            <FormControlLabel
              control={
                <Checkbox
                  value={project.frontend}
                  onChange={(e) => setProject({ ...project, frontend: e.target.checked })}
                />
              }
              label="Frontend"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={project.backend}
                  onChange={(e) => setProject({ ...project, backend: e.target.checked })}
                />
              }
              label="Backend"
            />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              name="description"
              value={project.description}
              onChange={(e: any) => setProject({ ...project, description: e.target.value })}
            />
          </Grid>
        </Grid>

        <Button
          variant='contained'
          type="submit"
          sx={{ marginTop: 2, float: 'right' }}
        >
          Save
        </Button>
      </Card>
    </form>
  )
}
