"use client";

import { TvShowModel } from "@/app/Model/Movie";
import SearchResultItem from "./searchResultItem";
import { Track } from "@/app/Model/Music";
import { User } from "@/app/Model/User";
interface SearchResultListProps {
  text?: string | undefined;
  tvShowList?: TvShowModel[];
  trackList?: Track[];
  userList?: User[];
  right?: boolean;
  onClose: () => void;
  onChoose: (data: TvShowModel | Track | User) => void;
  isLoading: boolean | undefined;
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  text,
  onChoose,
  tvShowList,
  isLoading,
  onClose,
  trackList,
  userList,
}) => {
  if (
    !isLoading &&
    tvShowList?.length === 0 &&
    trackList?.length === 0 &&
    userList?.length === 0 &&
    text !== ""
  ) {
    return (
      <div className="absolute w-[120%] transform  bg-black top-[100%] rounded-lg border-[1px] border-elife-700 h-20 flex justify-center items-center">
        No result found!{" "}
      </div>
    );
  }
  return text ? (
    <div
      className={`absolute w-[120%] transform  bg-black top-[100%] rounded-lg border-[1px] border-elife-700 h-52 overflow-y-auto scrollbar-none`}
    >
      {tvShowList?.map((tvShow, index) =>
        tvShow.poster_path && tvShow.backdrop_path ? (
          <SearchResultItem
            onChoose={onChoose}
            onClick={onClose}
            img={`https://image.tmdb.org/t/p/w200/${
              tvShow.poster_path !== null
                ? tvShow.poster_path
                : tvShow.backdrop_path
            }`}
            name={tvShow.name}
            key={index}
            dataType="tvShow"
            data={tvShow as TvShowModel}
          ></SearchResultItem>
        ) : null
      )}
      {trackList?.map((data: any, index: number) => (
        <SearchResultItem
          dataType="track"
          data={data as Track}
          name={data.name}
          artists={data.artists}
          key={index}
          img={data.album.images[0].url}
          onChoose={onChoose}
          onClick={onClose}
        ></SearchResultItem>
      ))}
      {userList?.map((user: any, index: number) => (
        <SearchResultItem
          dataType="user"
          data={user as User}
          img={user.avatar}
          key={index}
          onChoose={onChoose}
          onClick={onClose}
          name={user.username}
          isCeleb={user.isCeleb}
        ></SearchResultItem>
      ))}
    </div>
  ) : null;
};

export default SearchResultList;
