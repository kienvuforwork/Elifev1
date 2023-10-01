"use client";

interface dropdownItemProp {
  name: string;
  onClick: () => void;
}

const DropdownItem: React.FC<dropdownItemProp> = ({ name, onClick }) => {
  return (
    <div
      className="text-elife-700 block px-4 py-2 text-sm cursor-pointer rounded-md hover:bg-elife-500"
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default DropdownItem;
