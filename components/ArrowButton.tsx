export const ArrowButton = ({ position, onClick, disabled }: {
  position: "left" | "right",
  onClick: () => void,
  disabled?: boolean
}) => {
  if (disabled) {
    return null;
  }
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-white cursor-pointer z-50 relative w-8 h-8 ${position === "right" ? "mr-2" : "ml-2"}`}
      onClick={onClick}>
      {position === "right" &&
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></path>
        </svg>
      }
      {position === "left" &&
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"></path>
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
      }
    </div>
  );
};