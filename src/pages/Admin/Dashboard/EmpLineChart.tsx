import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Newly Registered Employees Chart (shown per company in a the selected year)",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const smapleData = [
  {
    companyName: "Credoks Digital",
    year: "2023",
    monthlyData: [
      { month: "January", noNewEmp: 0 },
      { month: "February", noNewEmp: 0 },
      { month: "March", noNewEmp: 0 },
      { month: "April", noNewEmp: 0 },
      { month: "May", noNewEmp: 0 },
      { month: "June", noNewEmp: 5 },
      { month: "July", noNewEmp: 0 },
      { month: "August", noNewEmp: 0 },
      { month: "September", noNewEmp: 0 },
      { month: "October", noNewEmp: 0 },
      { month: "November", noNewEmp: 0 },
      { month: "Decemeber", noNewEmp: 10 },
    ],
  },
  {
    companyName: "Startup Technologies",
    year: "2023",
    monthlyData: [
      { month: "January", noNewEmp: 0 },
      { month: "February", noNewEmp: 0 },
      { month: "March", noNewEmp: 0 },
      { month: "April", noNewEmp: 0 },
      { month: "May", noNewEmp: 0 },
      { month: "June", noNewEmp: 0 },
      { month: "July", noNewEmp: 0 },
      { month: "August", noNewEmp: 0 },
      { month: "September", noNewEmp: 0 },
      { month: "October", noNewEmp: 4 },
      { month: "November", noNewEmp: 0 },
      { month: "Decemeber", noNewEmp: 10 },
    ],
  },
];

export const data = {
  labels,
  datasets: [
    {
      label: smapleData[0].companyName,
      data: labels.map(
        (lab, index) => smapleData[0].monthlyData[index].noNewEmp
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: smapleData[1].companyName,
      data: labels.map(
        (lab, index) => smapleData[1].monthlyData[index].noNewEmp
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

function EmpLineChart() {
  return <Line options={options} data={data} />;
}

export default EmpLineChart;
