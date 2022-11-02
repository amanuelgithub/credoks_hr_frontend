export interface ICompany {
  id?: string;
  name?: string;
  logo?: string;
  companyStatus?: CompanyStatusEnum;
  bussinessType?: string;
  summary?: string;
}

export enum CompanyStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
