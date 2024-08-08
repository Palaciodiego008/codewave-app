'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(dashboard)/components/container/PageContainer';
// components
import SecurityMetricsOverview from '@/app/(dashboard)/components/dashboard/SecurityMetricsOverview';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SecurityMetricsOverview />
          </Grid>
          </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
