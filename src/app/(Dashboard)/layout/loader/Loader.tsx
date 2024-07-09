import { Box, BoxProps, Typography } from "@mui/material"

const Loader = ({ sx }: { sx?: BoxProps['sx'] }) => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Typography
        sx={{
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          letterSpacing: '0.15px',
          color: ' rgba(77, 80, 98, 0.68)'
        }}
      >
        Loading...
      </Typography>
    </Box>
  )
}

export default Loader;
