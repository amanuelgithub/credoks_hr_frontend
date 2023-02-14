interface IMonthlyReport {
  month: string;
  noNewEmp: number;
}

export interface ICompanyNewEmpReport {
  companyId: string;
  companyName: string;
  year: number;
  monthlyReport: IMonthlyReport[];
}
