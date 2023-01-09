import { IEmployee } from "./IEmployee";
import { MonthEnum } from "./IPayroll";

export interface IPay {
  id?: string;
  netPay: number;
  deduction: number;
  salaryIncomeTax: number;
  employeePension: number;
  payrollId: string;
  year: number;
  month: MonthEnum;
  employee: IEmployee;
}
