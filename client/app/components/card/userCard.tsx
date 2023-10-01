"use client";

import Button from "../button";
import { User } from "@/app/Model/User";
import { PiTelevisionSimpleLight } from "react-icons/pi";
import { CiMusicNote1 } from "react-icons/ci";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import ImageUploadModal from "../Modals/imageUploadModal";
import { useEffect, useState } from "react";
interface UserCardProps {
  user: User;
  isCurrentUser?: boolean;
  currentUser?: User;
}
const UserCard: React.FC<UserCardProps> = ({
  user,
  isCurrentUser,
  currentUser,
}) => {
  const [follow, setFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkIsFollow = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/user/is-follow/${user._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json(); // Parse the response body as JSON
        if (data.userExist) {
          setFollow(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    checkIsFollow();
  }, []);
  const handleFollowUser = async () => {
    try {
      if (!follow) {
        setFollow(true);
        const res = await fetch(
          `http://localhost:8080/user/follow/${user._id}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );
      } else if (follow) {
        setFollow(false);
        const res = await fetch(
          `http://localhost:8080/user/unfollow/${user._id}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col items-center  bg-center bg-cover border-elife-700 border-b-2">
      <div className="max-w-3xl w-full mx-auto z-10">
        <div className="flex flex-col">
          <div className=" shadow-lg p-4 m-4">
            <div className="flex-none sm:flex">
              <div className="relative h-28 w-28  sm:mb-0 mb-3">
                {user.avatar ? (
                  <img
                    src={user?.avatar}
                    className=" w-28 h-28 object-cover rounded-full"
                  />
                ) : (
                  <AiOutlineUser className=" w-28 h-28 object-cover rounded-full fill-elife-700 border-2 border-elife-700"></AiOutlineUser>
                )}

                {user?.isCeleb && (
                  <AiFillCheckCircle className="w-6 h-6 right-0 absolute bottom-1  fill-blue-600"></AiFillCheckCircle>
                )}
              </div>
              <div className="flex gap-2 flex-col  sm:ml-5 justify-center ">
                <div className="w-full flex-none text-lg text-gray-200 font-bold leading-none">
                  {user?.username}
                </div>
                <div className="text-sm text-slate-400">
                  {user?.followers?.length} followers
                </div>
                <div className="flex justify-start gap-8">
                  <div className="inline-flex items-center gap-2">
                    <CiMusicNote1 className={`w-5 h-5`}></CiMusicNote1>
                    <span className="text-slate-400 text-sm ">
                      {user?.listeningTrack?.length} Songs listening{" "}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <PiTelevisionSimpleLight
                      className={`w-5 h-5`}
                    ></PiTelevisionSimpleLight>
                    <p className="text-slate-400 text-sm">
                      {user?.tvShowWatching?.length} TvShows watching
                    </p>
                  </div>
                </div>
                <div>
                  {" "}
                  {!isCurrentUser ? (
                    follow ? (
                      <Button
                        label="Unfollow"
                        onClick={handleFollowUser}
                        sm={true}
                        isLoading={isLoading}
                        bgColor="bg-elife-700"
                      ></Button>
                    ) : (
                      <Button
                        label="Follow"
                        onClick={handleFollowUser}
                        sm={true}
                        isLoading={isLoading}
                      ></Button>
                    )
                  ) : (
                    <ImageUploadModal></ImageUploadModal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
