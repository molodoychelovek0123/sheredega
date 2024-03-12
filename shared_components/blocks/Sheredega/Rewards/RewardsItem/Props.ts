export type RewardsItemProps = {
  block?: any,
  mainText: string | null,
  tags?: (string | null)[] | null,
  year: string | null,
  theme: string | null,
  button?: {
    src?: string | null;
    text?: string | null;
    url?: string | null;
  } | null;
}