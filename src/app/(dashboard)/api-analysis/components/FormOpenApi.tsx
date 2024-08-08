"use client";

import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { OpenApiDto } from "../services/dto/OpenApi.dto";

interface FormOpenApiProps {
  title: string;
  openApi: OpenApiDto;
  setOpenApi: Dispatch<SetStateAction<OpenApiDto>>;
  action: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FormOpenApi = ({
  title,
  openApi,
  setOpenApi,
  action,
}: FormOpenApiProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOpenApi((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Extract file format/extension
      const format = file.name.split('.').pop();

      // Update the openApi state with the file format
      setOpenApi((prev) => ({ ...prev, format: format || '', openapi: '' }));

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setOpenApi((prev) => ({ ...prev, openapi: content }));
      };
      reader.readAsText(file);
    }
  };

  return (
    <form onSubmit={action}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="name"
              fullWidth
              label="Name"
              variant="outlined"
              value={openApi.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              fullWidth
              label="Description"
              variant="outlined"
              value={openApi.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="version"
              fullWidth
              label="Version"
              variant="outlined"
              value={openApi.version}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="format"
              fullWidth
              label="Format"
              variant="outlined"
              value={openApi.format}
              onChange={handleChange}
              placeholder="Auto-detected from file"
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              style={{ marginTop: 8 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="openapi"
              fullWidth
              label="OpenAPI Specification (file content)"
              variant="outlined"
              multiline
              rows={10}
              value={openApi.openapi}
              onChange={handleChange}
              placeholder="Upload an OpenAPI JSON file"
              disabled
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, display: "block", marginLeft: "auto", marginRight: 0 }}
        >
          Save
        </Button>
      </Card>
    </form>
  );
};

export default FormOpenApi;
