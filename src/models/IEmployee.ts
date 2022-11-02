export interface IEmployee {
  id?: string;
  firstName?: string;
  fatherName?: string;
  grandFatherName?: string;
  gender?: GenderEnum;
  dateOfBirth?: string;
  type?: UserTypeEnum;
  email?: string;
  phone?: string;
  password?: string;
  employmentStatus?: EmploymentStatusEnum;
  maritalStatus?: MaritalStatusEnum;
  dateOfJoining?: string;
  tinNumber?: string;
  accountNumber?: string;
}

export enum EmploymentStatusEnum {
  CONFIRMED = "Confirmed",
  CONTRACT = "Contract",
  PROBAATION = "Probation",
  TRAINEE = "Trainee",
}

export enum MaritalStatusEnum {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
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
