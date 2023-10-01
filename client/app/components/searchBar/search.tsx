"use client";
import { BiSearch } from "react-icons/bi";
import SearchResultList from "./searchResult";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { options } from "@/app/actions/Movie/getTvShow";
import { TvShowModel } from "@/app/Model/Movie";
import SearchResultSkeleton from "./searchResultSkeleton";
import { Track } from "@/app/Model/Music";
import { User } from "@/app/Model/User";

interface SearchProps {
  icon?: boolean;
  placeholder: string;
  sm?: boolean;
  rounded?: boolean;
  onChoose: (data: TvShowModel | Track | User) => void;
  searchTvShow?: boolean;
  searchMusic?: boolean;
  searchUser?: boolean;
  spotifyToken?: string;
}

const Search: React.FC<SearchProps> = ({
  icon,
  placeholder,
  sm,
  rounded,
  onChoose,
  searchTvShow,
  searchMusic,
  spotifyToken,
  searchUser,
}) => {
  const getTvShowByName = async (name: string) => {
    const url = `https://api.themoviedb.org/3/search/tv?&query=${name}`;
    const data = await fetch(url, options)
      .then((res) => res.json())
      .catch((err) => console.error("error:" + err));
    const tvShow: TvShowModel[] = data.results;
    return tvShow;
  };

  const getTrackByName = async (name: string) => {
    const url = `https://api.spotify.com/v1/search?q=${name}&type=track`;
    const headers = {
      Authorization: `Bearer ${spotifyToken}`,
    };
    const data = await fetch(url, { method: "GET", headers })
      .then((data) => data.json())
      .catch((err) => console.error("error:" + err));
    const tracks: Track[] = data.tracks.items;
    return tracks;
  };

  const getUserByName = async (name: string) => {
    const url = `http://localhost:8080/users/${name}`;

    const data = await fetch(url, { method: "GET" })
      .then((data) => data.json())
      .catch((err) => console.error("error:" + err));

    const users: User[] = data;
    return users;
  };

  const [text, setText] = useState<string>("");
  const [tvShow, setTvShow] = useState<TvShowModel[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    handleClose();
  }, [searchMusic, searchTvShow]);
  const handleClose = () => {
    setText("");
    setTvShow([]);
    setTracks([]);
  };
  const style = {
    sm: "h-[28px] rounded-sm ",
    rounded: "rounded-full",
  };
  const debouncedOnChangeTvShow = useCallback(
    debounce(async (searchText: string) => {
      const data = await getTvShowByName(searchText);
      setTvShow(data);
      setIsLoading(false);
    }, 300),
    []
  );

  const debouncedOnChangeUser = useCallback(
    debounce(async (searchText: string) => {
      const data = await getUserByName(searchText);
      setUsers(data);
      setIsLoading(false);
    }, 300),
    []
  );

  const debouncedOnChangeTrack = useCallback(
    debounce(async (searchText: string) => {
      const data = await getTrackByName(searchText);
      setTracks(data);
      setIsLoading(false);
    }, 300),
    []
  );
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setIsLoading(true);
    setText(searchText);
    if (searchMusic) {
      debouncedOnChangeTrack(searchText);
    }
    if (searchTvShow) {
      debouncedOnChangeTvShow(searchText);
    }
    if (searchUser) {
      debouncedOnChangeUser(searchText);
    }
  };

  return (
    <div className="flex relative justify-center items-center w-full">
      <span className="absolute right-2">
        {" "}
        {icon && (
          <BiSearch className="w-6 h-6 text-elife-600 cursor-pointer"></BiSearch>
        )}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={text}
        className={`focus:bg-white focus:outline-none   ${
          rounded ? style.rounded : ""
        }   focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-elife-700 text-sm md:text-md lg:text-lg bg-elife-500 w-full h-[30px] md:h-[35px] lg:h-[40px] p-2 px-4 ${
          sm ? style.sm : ""
        }  h-[40px]`}
      />
      {isLoading && text ? (
        <SearchResultSkeleton></SearchResultSkeleton>
      ) : (
        <SearchResultList
          onChoose={onChoose}
          onClose={handleClose}
          text={text}
          tvShowList={tvShow}
          trackList={tracks}
          userList={users}
          isLoading={isLoading}
        ></SearchResultList>
      )}
    </div>
  );
};

export default Search;
