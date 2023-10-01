"use client";

import { IconType } from "react-icons";

import Link from "next/link";
interface MenuItemProps {
  title: string;
  icon?: IconType;
  avatar?: string;
  activeIcon?: IconType;
  selected?: boolean;
  link: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  selected,
  icon: Icon,
  activeIcon: ActiveIcon,
  avatar,
  link,
}) => {
  return (
    <Link href={link}>
      <div
        className={`flex  md:px-4 md:py-2 rounded-full items-center cursor-pointer gap-1 md:gap-2 lg:gap-4 px-2 py-1
      ${selected && "bg-elife-700"}
       hover:bg-elife-700`}
      >
        {selected
          ? ActiveIcon && (
              <ActiveIcon className="w-8 h-8 cursor-pointer"></ActiveIcon>
            )
          : Icon && <Icon className="w-8 h-8 cursor-pointer"></Icon>}
        {avatar ? (
          <img src={avatar} className="rounded-full w-8 h-8"></img>
        ) : null}
        <span
          className={` text-sm md:text-sm lg:text-md xl:text-xl font-thin text-elife-400 ${
            selected ? "font-bold text-[1.4rem]" : ""
          }`}
        >
          {title}
        </span>
      </div>
    </Link>
  );
};

export default MenuItem;
