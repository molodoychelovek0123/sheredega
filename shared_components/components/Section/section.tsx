import React from "react";

export const Section = ({ children, className = "" }) => {

  return (
    <section
      className={`flex-1 relative transition duration-150 ease-out body-font  bg-white text-black ${className}`}
    >
      {children}
    </section>
  );
};
