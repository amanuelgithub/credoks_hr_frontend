import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useGetCompaniesEmployeesReportQuery } from "../../../services/employeeApiSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

function EmployeeChart() {
  const { data } = useGetCompaniesEmployeesReportQuery();

  let companyEmpStatusArrayChartData: any[] = [];

  let companyNames = [];
  let totalEmployees = [];

  for (let company of data ?? []) {
    companyNames.push(company.companyName);
    totalEmployees.push(company.totalEmployees);

    const companyEmpStatusSingleChartData = {
      name: company.companyName,
      data: {
        labels: ["Confirmed", "Contract", "Probation", "Traineee"],
        datasets: [
          {
            label: "# of Votes",
            data: [
              company.employmentStatus.confirmed,
              company.employmentStatus.contract,
              company.employmentStatus.probation,
              company.employmentStatus.trainee,
            ],
            backgroundColor: ["#B9FFF8", "#6FEDD6", "#FF9551", "#FF4A4A"],
            borderColor: ["#B9FFF8", "#6FEDD6", "#FF9551", "#FF4A4A"],
            borderWidth: 1,
          },
        ],
      },
    };

    companyEmpStatusArrayChartData.push(companyEmpStatusSingleChartData);
  }

  const totalEmpCharData = {
    labels: [...companyNames],
    datasets: [
      {
        label: "# of Votes",
        data: [...totalEmployees],
        backgroundColor: ["#E14D2A", "#3E6D9C", "#3F0071"],
        borderColor: ["#E14D2A", "#3E6D9C", "#3F0071"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* <Card sx={{ width: "fit-content" }}>
        <CardHeader title="Companies Total Employees" />
        <Divider />

        <CardContent>
          <Pie data={totalEmpCharData} />
        </CardContent>
      </Card> */}
      <Box sx={{ display: "flex", my: 2, gap: 4 }}>
        {companyEmpStatusArrayChartData.map((companyEmpStatusData) => (
          <Card sx={{ width: "fit-content", mb: 2 }}>
            <CardHeader
              title={companyEmpStatusData.name}
              subheader="employee types"
            />
            <Divider />

            <CardContent>
              <Pie data={companyEmpStatusData.data} />
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default EmployeeChart;
