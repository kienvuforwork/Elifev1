"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] grid grid-cols-12  mx-auto 2xl:px-[15rem] xl:px-5  lg:px-10  md:px-5 sm:px-3 px-2">
      {children}
    </div>
  );
};

export default Container;
