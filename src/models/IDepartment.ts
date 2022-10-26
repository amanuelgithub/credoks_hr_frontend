import { ICompany } from "./ICompany";

export interface IDepartment {
  id?: string;
  name?: string;
  description?: string;
  // company?: ICompany;
  // company?: string;
  companyId?: string;
}
