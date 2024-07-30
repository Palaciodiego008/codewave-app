"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Badge,
  Grid,
  Button,
  Modal,
  CircularProgress,
  Backdrop,
  IconButton,
} from "@mui/material";
import { useAtom } from "jotai";
import { projectSelectedFromRecommendation } from "@/context/jotai";
import CloseIcon from "@mui/icons-material/Close";
import { Highlight, themes } from "prism-react-renderer";

// Define the types for recommendations
interface Recommendation {
  title: string;
  description: string;
  status: string;
}

interface RecommendationsResponse {
  [category: string]: Recommendation[];
}

interface Recommendations {
  response: RecommendationsResponse;
}

const SecurityRecommendationsPageProject = () => {
  const params = useParams();
  const { id } = params;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectSelectedFromRecomendation] = useAtom(
    projectSelectedFromRecommendation
  );
  const [recommendations, setRecommendations] =
    useState<Recommendations | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (projectSelectedFromRecomendation) {
      setRecommendations(projectSelectedFromRecomendation.recommendations);
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulate a delay for loading data
    }
  }, [projectSelectedFromRecomendation]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Security Recommendations for Project{" "}
          {projectSelectedFromRecomendation?.project?.title}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          View Code
        </Button>
      </Box>

      {!loading && (
        <Grid container spacing={3} sx={{ maxWidth: 1200, mx: "auto" }}>
          {recommendations &&
            Object.entries(recommendations.response).map(
              ([category, items]) => (
                <Grid item xs={12} key={category}>
                  <Paper variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="h6" component="h2">
                      {category}
                    </Typography>
                    {items.map((recommendation, index) => (
                      <Paper
                        key={index}
                        variant="outlined"
                        sx={{
                          p: 3,
                          mt: 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="subtitle1">
                            {recommendation.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {recommendation.description}
                          </Typography>
                        </Box>
                        <Badge
                          badgeContent={recommendation.status}
                          color={
                            recommendation.status === "Passed"
                              ? "success"
                              : recommendation.status === "Needs Improvement"
                              ? "warning"
                              : recommendation.status === "Failed"
                              ? "error"
                              : "default"
                          }
                          sx={{ mr: 2 }}
                        />
                      </Paper>
                    ))}
                  </Paper>
                </Grid>
              )
            )}
        </Grid>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="view-code-modal-title"
        aria-describedby="view-code-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            border: "none",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography id="view-code-modal-title" variant="h6" component="h2">
              Project Code
            </Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ overflowX: "auto" }}>
            <Highlight
              code={projectSelectedFromRecomendation?.project?.snapshot_code}
              language="javascript"
              theme={themes.nightOwl}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default SecurityRecommendationsPageProject;
