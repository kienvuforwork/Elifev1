"use client";

import { useState } from "react";

interface SwitchBarProps {
  onSetMovie?: () => void;
  onSetMusic?: () => void;
  onSetFollower?: () => void;
  onSetFollowing?: () => void;
  onSetPost?: () => void;
}

const SwitchBar: React.FC<SwitchBarProps> = ({
  onSetMovie,
  onSetMusic,
  onSetFollower,
  onSetFollowing,
  onSetPost,
}) => {
  const [isMovie, setIsMovie] = useState<boolean>(true);
  const [isMusic, setIsMusic] = useState<boolean>(false);
  const [userFollower, setUserFollower] = useState<boolean>(false);
  const [userFollowing, setUserFollowing] = useState<boolean>(false);
  const [userPost, setUserPost] = useState<boolean>(true);
  const handleMovie = () => {
    onSetMovie && onSetMovie();
    setIsMovie(true);
    setIsMusic(false);
    setUserFollower(false);
    setUserFollowing(false);
    setUserPost(false);
  };
  const handleMusic = () => {
    onSetMusic && onSetMusic();
    setIsMovie(false);
    setIsMusic(true);
    setUserFollower(false);
    setUserFollowing(false);
    setUserPost(false);
  };
  const handleFollower = () => {
    onSetFollower && onSetFollower();
    setIsMovie(false);
    setIsMusic(false);
    setUserFollower(true);
    setUserFollowing(false);
    setUserPost(false);
  };
  const handleFollowing = () => {
    onSetFollowing && onSetFollowing();
    setIsMovie(false);
    setIsMusic(false);
    setUserFollower(false);
    setUserFollowing(true);
    setUserPost(false);
  };
  const handlePost = () => {
    onSetPost && onSetPost();
    setIsMovie(false);
    setIsMusic(false);
    setUserFollower(false);
    setUserFollowing(false);
    setUserPost(true);
  };
  return (
    <div className="flex justify-center items-center w-full text-sm md:text-md xl:text-lg text-elife-600 ">
      {onSetMovie && (
        <div
          className={`w-1/2 p-2 cursor-pointer flex justify-center ${
            isMovie ? "border-b-2 border-elife-600" : ""
          } `}
          onClick={handleMovie}
        >
          Watching
        </div>
      )}
      {onSetMusic && (
        <div
          className={`w-1/2 p-2 cursor-pointer flex justify-center ${
            isMusic ? "border-b-2 border-elife-600" : ""
          } `}
          onClick={handleMusic}
        >
          Listening
        </div>
      )}
      {onSetPost && (
        <div
          className={`w-1/2 p-2 cursor-pointer flex justify-center ${
            userPost ? "border-b-2 border-elife-600" : ""
          } `}
          onClick={handlePost}
        >
          Posts
        </div>
      )}

      {onSetFollower && (
        <div
          className={`w-1/2 p-2 cursor-pointer flex justify-center ${
            userFollower ? "border-b-2 border-elife-600" : ""
          } `}
          onClick={handleFollower}
        >
          Follower
        </div>
      )}
      {onSetFollowing && (
        <div
          className={`w-1/2 p-2 cursor-pointer flex justify-center ${
            userFollowing ? "border-b-2 border-elife-600" : ""
          } `}
          onClick={handleFollowing}
        >
          Following
        </div>
      )}
    </div>
  );
};

export default SwitchBar;
