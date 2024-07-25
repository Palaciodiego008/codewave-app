import { Button, styled, SxProps, Theme } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ForwardedRef, forwardRef } from "react";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FileUploadProps {
  sx?: SxProps<Theme>
  onChange: (file: File) => void
}

export const FileUpload = ({ sx, onChange }: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  }

  return (
    <Button
      sx={sx}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput
        type="file"
        onChange={handleFileChange}
      />
    </Button>
  );
};
