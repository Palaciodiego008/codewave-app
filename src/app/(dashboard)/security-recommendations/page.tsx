"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import { useAuthContext } from "@/context/AuthContext/auth.context";
import { useGetProjects } from "../projects/hooks/useGetProjects";
import { useAtom } from 'jotai';
import { projectSelectedFromRecommendation } from '@/context/AuthContext/jotai';

const cardStylesSx = {
  boxShadow: 3,
  borderRadius: 2,
  padding: 2,
  marginBottom: 2
};

const selectedCardStylesSx = {
  ...cardStylesSx,
  border: '2px solid #3f51b5'
};

const SecurityRecommendationsPage = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { projects, getProjects } = useGetProjects();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: { [label: string]: boolean } }>({});
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const [localProject, setLocalProject] = useState<any>(null);
  const [localCheckboxes, setLocalCheckboxes] = useState<{ [label: string]: boolean }>({});
  const [, setSelectedProject] = useAtom(projectSelectedFromRecommendation);

  useEffect(() => {
    if (user && !projectsLoaded) {
      getProjects(user.id).finally(() => {
        setProjectsLoaded(true);
      });
    }
  }, [user, projectsLoaded, getProjects]);

  const handleProjectSelect = (projectId: string) => {
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = { ...prevCheckedItems };

      // Deselect checkboxes of previously selected project
      if (selectedProjectId && selectedProjectId !== projectId) {
        newCheckedItems[selectedProjectId] = {}; // Clear checkboxes
      }

      const selectedProject = projects?.find(project => project.id === projectId);

      setSelectedProjectId(projectId);
      setLocalProject(selectedProject);
      setLocalCheckboxes(newCheckedItems[projectId] || {});
      return newCheckedItems;
    });
  };

  const handleCheckboxChange = (projectId: string, label: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItems(prevCheckedItems => {
      const newCheckedItems = {
        ...prevCheckedItems,
        [projectId]: {
          ...prevCheckedItems[projectId],
          [label]: event.target.checked
        }
      };

      if (projectId === selectedProjectId) {
        setLocalCheckboxes(newCheckedItems[projectId]);
      }

      if (projectId === selectedProjectId && !Object.values(newCheckedItems[projectId]).some(checked => checked)) {
        setSelectedProjectId(null);
        setLocalProject(null);
        setLocalCheckboxes({});
      }

      return newCheckedItems;
    });
  };

  const handleGoToAnalysis = () => {
    if (selectedProjectId) {
      setSelectedProject({
        project: localProject,
        checkboxes: localCheckboxes
      });

      router.push(`/security-recommendations/project/${selectedProjectId}`);
    }
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
            {projects?.filter(project => project?.snapshot_code).map((project) => (
              <Card
                key={project.id}
                sx={selectedProjectId === project.id && Object.values(checkedItems[project.id] || {}).some(checked => checked) ? selectedCardStylesSx : cardStylesSx}
                onClick={() => handleProjectSelect(project.id as string)}
              >
                <CardHeader title={project.title} subheader={project.description} />
                <CardContent>
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <FormControlLabel
                      control={<Checkbox checked={!!checkedItems[project.id as string]?.['Security']} onChange={(e) => handleCheckboxChange(project.id as string, 'Security', e)} />}
                      label="Security"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={!!checkedItems[project.id as string]?.['Legibility']} onChange={(e) => handleCheckboxChange(project.id as string, 'Legibility', e)} />}
                      label="Legibility"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={!!checkedItems[project.id as string]?.['Static Code Analysis']} onChange={(e) => handleCheckboxChange(project.id as string, 'Static Code Analysis', e)} />}
                      label="Static Code Analysis"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={!!checkedItems[project.id as string]?.['Dependency Scanning']} onChange={(e) => handleCheckboxChange(project.id as string, 'Dependency Scanning', e)} />}
                      label="Dependency Scanning"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={!!checkedItems[project.id as string]?.['SAST']} onChange={(e) => handleCheckboxChange(project.id as string, 'SAST', e)} />}
                      label="SAST"
                    />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
      {selectedProjectId && Object.values(checkedItems[selectedProjectId] || {}).some(checked => checked) && (
        <Box sx={{ padding: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleGoToAnalysis}>
            Go to Analysis
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default SecurityRecommendationsPage;
