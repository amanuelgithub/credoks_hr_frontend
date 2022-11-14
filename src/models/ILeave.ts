export interface ILeave {
  id?: string;
  leaveType?: LeaveTypeEnum;
  requestedDays?: number;
  garantedDays?: number;
  leaveStatus?: LeaveStatusEnum;
  employeeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum LeaveStatusEnum {
  PENDING = "PENDING",
  CANCELED = "CANCELED",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
}

export enum LeaveTypeEnum {
  SICK_LEAVE = "SICK_LEAVE",
  ANNUAL_LEAVE = "ANNUAL_LEAVE",
  MATERNITY_LEAVE = "MATERNITY_LEAVE",
  MARRIAGE_LEAVE = "MARRIAGE_LEAVE",
  PATERNITY_LEAVE = "PATERNITY_LEAVE",
}
