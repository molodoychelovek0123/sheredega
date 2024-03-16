import { PublicationsListItemProps } from "@/shared_components/blocks/Sheredega/PublicationsList/props";

export const PublicationsListItemContainer = ({ items }: { items?: (PublicationsListItemProps | null)[] | null }) => {
  return (
    <div className="w-full flex-col justify-start items-start gap-[30px] inline-flex">
      {(items ?? []).map(item => (
        <div className="flex-col justify-start items-start gap-3 flex">
          {item?.title &&
            <a className="opacity-30 text-black text-lg font-medium  leading-snug hover:opacity-15"
               href={`${item?.link ? item.link : "#"}`}>{item.title}</a>
          }
          {item?.content &&
            <a className="text-black text-xl font-normal leading-normal"
               href={`${item?.link ? item.link : "#"}`}>
              {item.content}
            </a>
          }
        </div>

      ))}
    </div>

  );

};