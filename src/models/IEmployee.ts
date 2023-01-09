export interface IEmployee {
  id?: string;
  companyId?: string;
  firstName?: string;
  fatherName?: string;
  grandFatherName?: string;
  gender?: GenderEnum;
  dateOfBirth?: Date | null;
  type?: UserTypeEnum;
  email?: string;
  phone?: string;
  profileImage?: string;
  password?: string;
  employmentStatus?: EmploymentStatusEnum;
  maritalStatus?: MaritalStatusEnum;
  dateOfJoining?: string;
  salary?: number;
  tinNumber?: string;
  bankName?: string;
  bankAccountNumber?: string;
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
