import { NationalIdPayload } from "./national-id.payload";

export interface IdentityInfoPayload {
  idNational: NationalIdPayload;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
}
