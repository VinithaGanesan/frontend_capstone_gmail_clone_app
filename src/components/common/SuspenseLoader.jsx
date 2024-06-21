import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export default function SuspenseLoader() {
  return (
    <Box>
      <CircularProgress />
      <Typography>
        Loading...
      </Typography>
    </Box>
  )
}
