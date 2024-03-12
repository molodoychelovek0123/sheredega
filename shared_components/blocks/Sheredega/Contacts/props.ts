import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export type ContactsProps = {
  block: any | null;
  textContent: string | null;
  baseEmail: string | null;
  phone: string | null;
  companyName: string | null;
  secondaryEmailTitle: string | null;
  secondaryEmail: string | null;
  tgLinkText: string | null;
  tgLink: string | null;
} & Omit<BaseSectionProps, "grid">