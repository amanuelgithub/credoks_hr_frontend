export interface IEmergencyContact {
  id?: string;
  employeeId?: string;
  firstName: string;
  lastName: string;
  phone: string;
  relation: string;
}

export enum RelationTypeEnum {
  MOTHER = "MOTHER",
  FATHER = "FATHER",
  SISTER = "SISTER",
  BROTHER = "BROTHER",
  FAMILY = "FAMILY",
  FRIEND = "FRIEND",
  OTHER = "OTHER",
}
