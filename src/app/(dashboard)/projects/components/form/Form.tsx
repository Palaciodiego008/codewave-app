'use client'

import CustomTextField from "@/app/(dashboard)/components/forms/theme-elements/CustomTextField"
import { Autocomplete, Button, Card, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react"

interface FormProjectsProps {
  title: string
}

export const FormProjects = ({ title }: FormProjectsProps) => {
  const [project, setProject] = useState<any>({
    title: '',
    description: '',
    languages: [],
    backend: false,
    frontend: false,
  })

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
    <form>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
            />
          </Grid>

          <Grid item xs={4}>
            <Autocomplete
              fullWidth
              multiple
              options={languages}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Languages" variant="outlined" />}
            />
          </Grid>

          <Grid item xs={4}>
            <FormControlLabel control={<Checkbox />} label="Frontend" />
            <FormControlLabel control={<Checkbox />} label="Backend" />
          </Grid>

          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={project.description}
              onChange={(e: any) => setProject({ ...project, description: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          variant='contained'
          sx={{ marginTop: 2, float: 'right' }}
        >
          Save
        </Button>
      </Card>
    </form>
  )
}
