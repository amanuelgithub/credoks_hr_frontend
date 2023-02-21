export enum SalaryRevisionStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DECLINED = "DECLINED",
}

export interface ISalaryRevision {
  id?: string;
  employeeId?: string;
  newSalary?: number;
  revisionStatus?: SalaryRevisionStatusEnum;
  makerEmployeeId?: string;
  checkerEmployeeId?: string;
  // Date when a maker created the salary revision
  makerDate?: Date;
  // Date a checker approved the salary revision
  checkerDate?: Date;
  reasonForRevision: string;
  comments: string;
}
