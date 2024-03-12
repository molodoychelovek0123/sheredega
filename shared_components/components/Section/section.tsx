import React, { ReactNode } from "react";

export const Section = ({ children, className = "" } : {
  children?: ReactNode,
  className?: string
}) => {

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font  bg-white text-black ${className}`}
    >
      {children}
    </section>
  );
};
