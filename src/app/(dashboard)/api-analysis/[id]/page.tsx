"use client";

import {
  Box,
  Button,
  Card,
  Modal,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  SxProps,
  Theme
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetOpenApiById } from "../hooks/useGetApiAnalysis";
import { useParams } from "next/navigation";
import dynamic from 'next/dynamic';
import "swagger-ui-react/swagger-ui.css";
import { OpenApiDto } from "../services/dto/OpenApi.dto";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

const suggestions = [
  "Check for deprecated endpoints",
  "Verify authentication and authorization mechanisms",
  "Ensure proper error handling",
  "Review API documentation for completeness",
  "Validate data models and response structures"
];

const OpenApiDetails = () => {
  const { id } = useParams();
  const { getOpenApiById } = useGetOpenApiById();
  const [openApiData, setOpenApiData] = useState<OpenApiDto | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const cardStylesSx: SxProps<Theme> = {
    padding: 4,
    marginTop: 4,
  };

  useEffect(() => {
    if (id) {
      getOpenApiById(id as string)
        .then((response) => {
          if (response) {
            setOpenApiData(response);
          } else {
            console.error("API response or data not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching OpenAPI:", error);
        });
    }
  }, [id]);

  const handleOpen = () => {
    setLoading(true);
    setTimeout(() => { // Simulate loading delay
      setLoading(false);
      setOpen(true);
    }, 500); // Adjust the delay as needed
  };

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Typography variant="h2">OpenAPI Details</Typography>

      {openApiData && (
        <>
          <Card sx={cardStylesSx}>
            <Typography variant="h4">{openApiData.name || 'No Name Available'}</Typography>
            <Typography variant="h5">{openApiData.description || 'No Description Available'}</Typography>
            <Typography variant="body1">{`Version: ${openApiData.version || 'No Version Available'}`}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ marginTop: 2 }}
            >
              Analyze API
            </Button>
          </Card>

          <Card sx={cardStylesSx}>
            <Typography variant="h5">Swagger UI</Typography>
            {openApiData.openapi ? (
              <SwaggerUI spec={JSON.parse(openApiData.openapi)} />
            ) : (
              <Typography>Loading API specification...</Typography>
            )}
          </Card>

          {/* Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Typography id="modal-title" variant="h6" component="h2">
                    API Suggestions
                  </Typography>
                  <List>
                    {suggestions.map((suggestion, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={suggestion} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClose}
                sx={{ marginTop: 2 }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </Box>
  );
};

export default OpenApiDetails;
