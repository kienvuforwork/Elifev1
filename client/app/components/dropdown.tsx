"use client";

import DropdownItem from "./dropdownItem";

interface dropdownProps {
  type: string;
}

const Dropdown: React.FC<dropdownProps> = ({ type }) => {
  // const isOpen = useSelector((state: RootState) => state.dropdownSlice.isOpen);

  const dummy = () => {
    return;
  };

  return (
    <div className="absolute left-0 bg-elife-400 w-52 top-8 transform -translate-x-1/2 z-10 rounded-md focus:outline-none hover:outline-none">
      <DropdownItem name="Account setting" onClick={dummy}></DropdownItem>
      <DropdownItem name="Logout" onClick={dummy}></DropdownItem>
    </div>
  );
};

export default Dropdown;
