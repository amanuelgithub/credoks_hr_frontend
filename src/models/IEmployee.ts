import { IUser } from "./IUser";

export interface IEmployee extends IUser {
  status?: EmployeeStatusEnum;
  dateOfJoining?: string;
  confirmationDate?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  fatherName?: string;
  spouseName?: string;
  accountNumber?: string;
  startsAt?: string;
  endsAt?: string;
  // user: User;
  // manager?: Manager;
  // hr?: Hr;
}

export enum EmployeeStatusEnum {
  CONFIRMED = "Confirmed",
  CONTRACT = "Contract",
  PROBAATION = "Probation",
  TRAINEE = "Trainee",
}
