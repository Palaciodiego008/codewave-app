"use client";

import React, { useEffect } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useAuthContext } from "@/context/AuthContext/auth.context";
import { useGetProjects } from "../projects/hooks/useGetProjects";

const cardStylesSx = {
  boxShadow: 3,
  borderRadius: 2,
  padding: 2,
  marginBottom: 2
};

const SecurityRecommendationsPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { projects, getProjects } = useGetProjects();

  useEffect(() => {
    if (user && projects.length === 0) {
      getProjects(user.id);
    }
  }, [user, projects]);

  const handleGoToAnalysis = (projectId: any) => {
    router.push(`/security-recommendations/project/${projectId}`);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ padding: 4, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Project Security Checklist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ensure your source code projects follow best practices for security, legibility, and maintainability.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ flex: 1, padding: 4 }}>
        <Box sx={{ maxWidth: 1200, margin: 'auto', display: 'grid', gap: 4 }}>
          <Typography variant="h4" gutterBottom>Select a Project</Typography>
          <Box sx={{ display: 'grid', gap: 4 }}>
            {projects.map((project) => (
              <Card key={project.id} sx={cardStylesSx}>
                <CardHeader title={project.title} subheader={project.description} />
                <CardContent>
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <FormControlLabel control={<Checkbox />} label="Security" />
                    <FormControlLabel control={<Checkbox />} label="Legibility" />
                    <FormControlLabel control={<Checkbox />} label="Static Code Analysis" />
                    <FormControlLabel control={<Checkbox />} label="Dependency Scanning" />
                    <FormControlLabel control={<Checkbox />} label="SAST" />
                  </Box>
                </CardContent>
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                  <Button variant="contained" color="primary" onClick={() => handleGoToAnalysis(project.id)}>
                    Go to Analysis
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SecurityRecommendationsPage;
