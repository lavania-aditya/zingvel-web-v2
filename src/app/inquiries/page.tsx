import { Metadata } from "next";
import { InquiriesClient } from "@/components/InquiriesClient";

export const metadata: Metadata = {
  title: "My Inquiries | Zingvel",
  description: "View and manage your travel inquiries with Zingvel",
};

export default function InquiriesPage() {
  return <InquiriesClient />;
}
