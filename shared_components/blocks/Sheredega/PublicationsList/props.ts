import { animationFieldType } from "@/global/constants/animations";
import { RewardsItemProps } from "@/shared_components/blocks/Sheredega/Rewards/RewardsItem/Props";
import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";

export type  PublicationsListItemProps = {
  title?: string | null;
  content?: string | null;
  link?: string | null;
}

export type  PublicationsListProps = {
  blockTitle?: string | null;
  componentStart?: string | null;
  fontSize?: string | null;
  animation?: animationFieldType | null,
  items?: (PublicationsListItemProps | null)[] | null
} & BaseSectionProps