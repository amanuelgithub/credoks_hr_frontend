export interface ICompany {
  id?: string;
  name?: string;
  companyLogo?: string;
  status?: CompanyStatusEnum;
  summary?: string;
  //   locations: Location[];
  //   departments: Department[];
}

export enum CompanyStatusEnum {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
