import { BaseSectionProps } from "@/shared_components/blocks/Sheredega/constants";
import { animationFieldType } from "@/global/constants/animations";
import { RewardsItemProps } from "@/shared_components/blocks/Sheredega/Rewards/RewardsItem/Props";

export type RewardsProps = {
  blockTitle?: string | null;
  componentStart?: string| null;
  fontSize?: string| null;
  animation?: animationFieldType| null,
  items?: (RewardsItemProps | null)[] | null
} & BaseSectionProps