"use client";

import MovieCard from "../card/movieCard";
import TrackCard from "../card/trackCard";
import { TvShowModel } from "@/app/Model/Movie";
import { useState, useEffect, Fragment } from "react";
import SwitchBar from "./switchBar";
import { TrackModel } from "@/app/Model/Music";
import Search from "../searchBar/search";
import { User } from "@/app/Model/User";

import { useRouter } from "next/navigation";
interface SideBarProps {
  moviesData: TvShowModel[];
  trackData: TrackModel[];
}

const RightBar: React.FC<SideBarProps> = ({ moviesData, trackData }) => {
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const [isMusic, setIsMusic] = useState<boolean>(false);
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);
  const [isLoadingTrack, setIsLoadingTrack] = useState(true);
  const router = useRouter();
  const onChoose = (user: User) => {
    router.push(`/user/${user.username}`);
  };
  useEffect(() => {
    if (moviesData) {
      setIsLoadingMovie(false);
    }
    if (trackData) {
      setIsLoadingTrack(false);
    }
  }, []);
  const hanldeMovie = () => {
    setIsMovie(true);
    setIsMusic(false);
  };
  const hanldeMusic = () => {
    setIsMusic(true);
    setIsMovie(false);
  };

  return (
    <Fragment>
      {" "}
      <div className="p-4 pt-2 pl-6">
        <div className="px-4">
          <Search
            placeholder="Search user"
            // @ts-ignore
            onChoose={onChoose}
            rounded
            icon
            searchUser
          ></Search>
        </div>

        <div className="xl:text-2xl text-sm md:text-md font-medium flex justify-center text-elife-400 text-center p-4  gap-4 flex-col -z-10 ">
          {" "}
          Trending Now: What Everyone's
          <SwitchBar
            onSetMovie={() => hanldeMovie()}
            onSetMusic={() => hanldeMusic()}
          ></SwitchBar>
        </div>
        {isMovie ? (
          <div className=" flex flex-col border-2 border-elife-700 border-t-0  h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-elife-700">
            {moviesData.map((movie, index) => (
              <MovieCard
                image_src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                name={movie.name}
                rating={movie.vote_average}
                key={index}
                isLoading={isLoadingMovie}
                border
                isDisable
              ></MovieCard>
            ))}
          </div>
        ) : null}
        {isMusic ? (
          <div className=" flex flex-col border-2 border-elife-700  border-t-0  h-[70vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-elife-700">
            {trackData?.map((data, index) => (
              <TrackCard
                name={data.track.name}
                artists={data.track.artists}
                key={data.track.id}
                image_src={data.track.album.images[0].url}
                isLoading={isLoadingTrack}
                border
              ></TrackCard>
            ))}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default RightBar;
