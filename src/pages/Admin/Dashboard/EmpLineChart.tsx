import { useState } from "react";
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
import { useGetCompaniesNewEmployeesReportQuery } from "../../../services/reportApiSlice";
import { getCurrentYear } from "../../../utils/time";
import Divider from "@mui/material/Divider";

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

const currentYear = getCurrentYear();

function EmpLineChart() {
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const { data: companiesNewEmpReports } =
    useGetCompaniesNewEmployeesReportQuery(selectedYear);

  // last five years
  const lastFiveYears = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

  const orgDatasets = [];
  for (let report of companiesNewEmpReports ?? []) {
    const firstColor = Math.random() * 255;
    const secondColor = Math.random() * 255;
    const thirdColor = Math.random() * 255;

    const dataset = {
      label: report.companyName,
      data: labels.map((lab, index) => report.monthlyReport[index].noNewEmp),
      borderColor: `rgb(${firstColor}, ${secondColor}, ${thirdColor})`,
      backgroundColor: `rgba(${firstColor}, ${secondColor}, ${thirdColor}, 0.5)`,
    };
    orgDatasets.push(dataset);
  }

  const chartData = {
    labels,
    datasets: orgDatasets,
  };

  return (
    <div className="my-12">
      <div className="sm:flex sm:justify-start sm:items-center sm:gap-4">
        <p className="font-bold">Select Year: </p>
        <div className="sm:flex sm:justify-center items-center sm:gap-4 ">
          {lastFiveYears.map((year, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedYear(year)}
              className={`border border-gray-200 bg-white px-4 py-2 rounded-full
                         hover:bg-yellow-500 ${
                           selectedYear === year
                             ? "bg-yellow-500 hover:bg-yellow-500"
                             : ""
                         }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <Divider sx={{ my: 2 }} />

      <div>
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}

export default EmpLineChart;
