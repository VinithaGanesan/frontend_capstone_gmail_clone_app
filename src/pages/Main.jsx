import React, { Fragment, Suspense, useState } from 'react'
import Header from '../components/Header'
import { Box, Container, CssBaseline, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { Outlet } from 'react-router-dom';

export default function Main() {
  const [openDrawer, setOpenDrawer] = useState(true);

  function toggleDrawer() {
    setOpenDrawer(prevState => !prevState)
  }

  return (
    <Fragment>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <Box sx={{ borderRadius: '10px', margin: '0 10px 10px 0px' }}>
        <Sidebar openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
        <Suspense fallback={<SuspenseLoader />}>
          <Outlet context={{ openDrawer }} />
        </Suspense>
      </Box>
    </Fragment>
  )
}
