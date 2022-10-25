export interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  type?: UserTypeEnum;
  dateOfBirth?: string;
  gender?: GenderEnum;
  // entity relation fields //
  //   admin?: Admin;
  //   employee?: Employee;
  //   company?: Company;
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
