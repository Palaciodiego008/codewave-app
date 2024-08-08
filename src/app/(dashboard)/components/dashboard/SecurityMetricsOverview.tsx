import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(dashboard)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SecurityMetricsOverview = () => {
  // select
  const [metric, setMetric] = React.useState("security");

  const handleChange = (event: any) => {
    setMetric(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart: any = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: [6],
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },

    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: [
        "Metric 1",
        "Metric 2",
        "Metric 3",
        "Metric 4",
        "Metric 5",
        "Metric 6",
        "Metric 7",
        "Metric 8",
      ],
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart: any = [
    {
      name: metric === "security" ? "Security Issues" : metric === "readability" ? "Readability Score" : "Performance",
      data: metric === "security" ? [20, 15, 25, 10, 30, 5, 20, 25] : metric === "readability" ? [75, 80, 85, 70, 90, 65, 80, 85] : [70, 65, 75, 60, 80, 55, 70, 75],
    },
    {
      name: metric === "security" ? "Resolved Issues" : metric === "readability" ? "Improvement Score" : "Efficiency",
      data: metric === "security" ? [15, 10, 20, 5, 25, 0, 15, 20] : metric === "readability" ? [10, 15, 20, 5, 25, 0, 10, 15] : [65, 60, 70, 55, 75, 50, 65, 70],
    },
  ];

  return (
    <DashboardCard
      title="Security Metrics Overview"
      action={
        <Select
          labelId="metric-dd"
          id="metric-dd"
          value={metric}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value="security">Security</MenuItem>
          <MenuItem value="readability">Readability</MenuItem>
          <MenuItem value="performance">Performance</MenuItem>
        </Select>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height={370}
        width={"100%"}
      />
    </DashboardCard>
  );
};

export default SecurityMetricsOverview;
