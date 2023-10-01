"use client";

import React from "react";
import { TvShowModel } from "@/app/Model/Movie";
import { Track } from "@/app/Model/Music";
import { User } from "@/app/Model/User";
import { AiOutlineUser } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
interface SearchResultItemProps {
  dataType: "tvShow" | "track" | "user";
  data: TvShowModel | Track | User;
  img: string;
  name: string;
  artists?: string[];
  onClick: () => void;
  onChoose: (data: TvShowModel | Track | User) => void;
  isCeleb?: boolean;
}
const SearchResultItem: React.FC<SearchResultItemProps> = ({
  img,
  name,
  artists,
  onClick,
  dataType,
  onChoose,
  data,
  isCeleb,
}) => {
  const handleChoose = () => {
    onClick();

    if (dataType === "tvShow") {
      const tvShowData = data as TvShowModel;
      onChoose({
        ...tvShowData,
        type: "tvShow",
        poster_path: `https://image.tmdb.org/t/p/w200/${tvShowData.poster_path}`,
        backdrop_path: `https://image.tmdb.org/t/p/w200/${tvShowData.backdrop_path}`,
      } as TvShowModel);
    } else if (dataType === "track") {
      onChoose({ ...data, type: "track" } as Track);
    } else if (dataType === "user") {
      onChoose({ ...data } as User);
    }
  };
  return (
    <div
      className="flex py-2 px-4 text-sm gap-4 hover:opacity-80 cursor-pointer border-b-[1px] border-elife-700"
      onClick={handleChoose}
    >
      {img ? (
        <div className="relative">
          <img
            src={img}
            className={`w-12 ${dataType === "track" ? "h-12" : "h-auto"} ${
              dataType === "user" && "rounded-full w-8 h-8"
            }`}
          ></img>
          {isCeleb && (
            <AiFillCheckCircle className="w-3 h-3 right-0 absolute bottom-0  fill-blue-600"></AiFillCheckCircle>
          )}
        </div>
      ) : (
        <div className="relative">
          {" "}
          <AiOutlineUser className=" w-8 h-8 object-cover rounded-full fill-elife-700 border-2 border-elife-700"></AiOutlineUser>{" "}
          {isCeleb && (
            <AiFillCheckCircle className="w-3 h-3 right-0 absolute bottom-0  fill-blue-600"></AiFillCheckCircle>
          )}
        </div>
      )}

      <div
        className={`flex flex-col ${dataType === "user" && "justify-center"}`}
      >
        <div className=""> {name}</div>
        {artists && (
          <div className="flex flex-wrap gap-1 mt-1">
            {artists?.map((artist: any, index: number) => (
              <span className=" text-elife-600" key={index}>
                {index === artists.length - 1 ? artist.name : artist.name + ","}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultItem;
