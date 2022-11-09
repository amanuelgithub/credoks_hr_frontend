export interface ICompanyEmployeeReport {
  companyName: string;
  totalEmployees: number;
  employmentStatus: {
    confirmed: number;
    contract: number;
    probation: number;
    trainee: number;
  };
}
