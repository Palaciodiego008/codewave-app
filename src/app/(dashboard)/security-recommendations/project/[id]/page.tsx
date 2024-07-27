'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography, Paper, Badge, Grid, Button, Modal } from "@mui/material";
import { useAtom } from "jotai";
import { projectSelectedFromRecommendation } from "@/context/AuthContext/jotai";

const SecurityRecommendationsPageProject = () => {
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [projectSelectedFromRecomendation] = useAtom(projectSelectedFromRecommendation);

  useEffect(() => {
    console.log("projectSelectedFromRecomendation", projectSelectedFromRecomendation);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100vh', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Security Recommendations for Project {id}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          View Code
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" component="h2">
              Security
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Cross-Site Scripting (XSS)</Typography>
                <Typography variant="body2" color="textSecondary">No vulnerabilities found</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">SQL Injection</Typography>
                <Typography variant="body2" color="textSecondary">No vulnerabilities found</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">OWASP Top 10</Typography>
                <Typography variant="body2" color="textSecondary">No critical vulnerabilities found</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" component="h2">
              Readability
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Cognitive Complexity</Typography>
                <Typography variant="body2" color="textSecondary">Average complexity: 3.2</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Maintainability Index</Typography>
                <Typography variant="body2" color="textSecondary">Average score: 85</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Duplicate Code</Typography>
                <Typography variant="body2" color="textSecondary">Duplication rate: 5%</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" component="h2">
              Static Code Analysis
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Unused Variables</Typography>
                <Typography variant="body2" color="textSecondary">2 unused variables found</Typography>
              </Box>
              <Badge badgeContent="Needs Improvement" color="warning" sx={{ mr: 2, maxWidth: 'fit-content' }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Linting Errors</Typography>
                <Typography variant="body2" color="textSecondary">12 linting errors found</Typography>
              </Box>
              <Badge badgeContent="Needs Improvement" color="warning" sx={{ mr: 2, maxWidth: 'fit-content' }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Cyclomatic Complexity</Typography>
                <Typography variant="body2" color="textSecondary">Average complexity: 4.1</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" component="h2">
              Dependency Scanning
            </Typography>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Outdated Dependencies</Typography>
                <Typography variant="body2" color="textSecondary">3 outdated dependencies found</Typography>
              </Box>
              <Badge badgeContent="Needs Improvement" color="warning" sx={{ mr: 2, maxWidth: 'fit-content' }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">Vulnerable Dependencies</Typography>
                <Typography variant="body2" color="textSecondary">1 vulnerable dependency found</Typography>
              </Box>
              <Badge badgeContent="Failed" color="error" sx={{ mr: 2 }} />
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="subtitle1">SAST</Typography>
                <Typography variant="body2" color="textSecondary">No critical issues found</Typography>
              </Box>
              <Badge badgeContent="Passed" color="success" sx={{ mr: 2 }} />
            </Paper>
          </Paper>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="view-code-modal-title"
        aria-describedby="view-code-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography id="view-code-modal-title" variant="h6" component="h2">
            Project Code
          </Typography>
          <Typography id="view-code-modal-description" sx={{ mt: 2 }}>
            {"<html>\n<head>\n<title>My Project</title>\n</head>\n<body>\n<h1>Hello, World!</h1>\n</body>\n</html>"}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default SecurityRecommendationsPageProject;
