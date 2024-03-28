export const CloseButton = ({  onClick, disabled }: {
  onClick: () => void,
  disabled?: boolean
}) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }

    onClick();
  };
  return (
    <div
      className={`flex items-center justify-center rounded-full ${disabled ? "opacity-30" : "cursor-pointer"} bg-[#111111]  z-50 relative w-8 h-8 mr-5 mt-5 p-2.5 pointer-events-auto`}
      onClick={handleClick}>
      <svg width="24" height="24" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.00017L25 25M25 1L1.00027 25" stroke="white" strokeWidth="2.5"/>
      </svg>

    </div>
  );
};