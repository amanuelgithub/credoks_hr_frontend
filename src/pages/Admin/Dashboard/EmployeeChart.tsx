import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
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

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-2 my-5 md:flex-row md:justify-evenly">
        {companyEmpStatusArrayChartData.map((companyEmpStatusData) => (
          <Card className="w-full md:w-1/2">
            <CardHeader
              title={companyEmpStatusData.name}
              // subheader="employee types"

              sx={{ textAlign: "center" }}
            />
            <Divider />

            <CardContent>
              <Pie data={companyEmpStatusData.data} />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default EmployeeChart;
