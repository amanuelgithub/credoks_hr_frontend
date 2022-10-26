export interface IEmployee {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  type?: UserTypeEnum;
  dateOfBirth?: string;
  gender?: GenderEnum;

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
}

export enum EmployeeStatusEnum {
  CONFIRMED = "Confirmed",
  CONTRACT = "Contract",
  PROBAATION = "Probation",
  TRAINEE = "Trainee",
}

export enum UserTypeEnum {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  EMPLOYEE = "EMPLOYEE",
  HR = "HR",
}

export enum GenderEnum {
  MALE = "Male",
  FEMALE = "Female",
}
