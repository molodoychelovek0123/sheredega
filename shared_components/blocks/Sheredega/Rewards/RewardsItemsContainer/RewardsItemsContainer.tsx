import { RewardsItem } from "../RewardsItem/RewardsItem";
import { RewardsItemProps } from "../RewardsItem/Props";
import React from "react";

export const RewardsItemsContainer = ({ items }: { items?: (RewardsItemProps | null)[] | null }) => {
  const [page, setPage] = React.useState(1);

  const len = (items ?? [])?.length;
  return (

    <div className="flex flex-col">
      {(items ?? []).slice(0, 4 * page).map((item, index) => (
        // Bad usage
        <React.Fragment key={index}>
          {item &&
            <RewardsItem
              {...item}
              block={item}
            />
          }


        </React.Fragment>
      ))}

      {page * 4 < len &&
        <div
          className=" w-full justify-end text-black text-xl cursor-pointer  md:text-2xl lg:text-3xl font-medium leading-[90%] inline-flex items-center gap-2.5 mt-8 lg:mt-10"
          onClick={() => setPage(prev => prev + 1)}
        >
          <span>показать еще</span>
          <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.91968 0.0566406H11.0002V17.0009H7.91968V0.0566406Z" fill="black" />
            <path d="M17.9321 6.98948V10.07L0.987793 10.07L0.987793 6.98948L17.9321 6.98948Z" fill="black" />
          </svg>
        </div>
      }
    </div>
  );
};