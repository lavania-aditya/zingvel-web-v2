import { IUser } from "./IUser";

export type ILeadStages = "new" | "valid" | "invalid" | "converted" | "dropped";

export interface ILead {
  id: string;
  userId: string;
  user: IUser;
  packageId: string;
  packageName: string;
  partner_id: string;
  stage: ILeadStages;
  createdAt: string;
  updatedAt: string;
}

export interface ILeadResponse {
  content: ILead[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const LEAD_STATUS_COLORS = {
  new: {
    bg: "#EFF6FF",
    text: "#1E40AF",
    darkBg: "rgba(30, 64, 175, 0.3)",
    darkText: "#93C5FD"
  },
  valid: {
    bg: "#ECFDF5",
    text: "#065F46",
    darkBg: "rgba(6, 95, 70, 0.3)",
    darkText: "#6EE7B7"
  },
  invalid: {
    bg: "#FEF2F2",
    text: "#991B1B",
    darkBg: "rgba(153, 27, 27, 0.3)",
    darkText: "#FCA5A5"
  },
  converted: {
    bg: "#F5F3FF",
    text: "#5B21B6",
    darkBg: "rgba(91, 33, 182, 0.3)",
    darkText: "#C4B5FD"
  },
  dropped: {
    bg: "#F3F4F6",
    text: "#1F2937",
    darkBg: "rgba(31, 41, 55, 0.5)",
    darkText: "#9CA3AF"
  }
};
