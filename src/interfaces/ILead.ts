import { IUser } from "./IUser";

export type ILeadStages = "new" | "valid" | "invalid" | "converted" | "dropped";

export interface ILead {
  _id?: string;
  userId: string;
  user: IUser;
  packageId: string;
  packageName?: string;
  partner_id: string;
  stage: ILeadStages;
  createdAt?: string;
  updatedAt?: string;
}
