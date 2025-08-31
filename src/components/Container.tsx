import React from "react";

const Container = ({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-8 ${classname}`}>{children}</div>
  );
};

export default Container;
