import { AiOutlineUser } from "react-icons/ai";
import TrackCard from "./trackCard";
import { Track } from "@/app/Model/Music";
import Chip from "../chip";
import Button from "../button";
import MovieCard from "./movieCard";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  onOpen as onOpenShareModal,
  setData,
} from "@/app/store/shareModalSlice";
import { FiDelete } from "react-icons/fi";
import { TvShowModel } from "@/app/Model/Movie";
import CardLoadingSkeleton from "./cardLoadingSkeleton";

interface PostProps {
  username: string;
  avatar?: string;
  data: any;
  date: string;
  recommend?: boolean;
  vibes?: string[];
  type: "track" | "tvShow";
  onDelete?: () => void;
  isCeleb?: boolean;
  isLoggedIn?: boolean;
  isLoading?: boolean;
}

const Post: React.FC<PostProps> = ({
  username,
  data,
  onDelete,
  date,
  avatar,
  type,
  isCeleb,
  isLoggedIn,
  isLoading,
}) => {
  const user = useSelector((state: RootState) => state.userSlice.username);
  const isCurrentUser = user === username;
  const customDate = date && date.split(",")[0].replace(/\//g, "-");
  const dispatch: AppDispatch = useDispatch();
  const setShareModal = () => {
    dispatch(onOpenShareModal());
    delete data.vibes;
    delete data.like;
    if (type === "track") {
      dispatch(
        setData({
          artists: data.artists.map((name: any) => ({ name })),
          name: data.name,
          album: {
            images: [{ url: `http://localhost:8080/track/image/${data.id}` }],
          },
          type: "track",
          id: data.id,
        } as Track)
      );
    } else if (type === "tvShow") {
      dispatch(
        setData({
          ...(data as TvShowModel),
          type: "tvShow",
          poster_path: `http://localhost:8080/tvShow/image/${data.id}`,
          backdrop_path: `http://localhost:8080/tvShow/image/${data.id}`,
          origin_country: [data.origin_country],
        })
      );
    }
  };
  if (isLoading) {
    console.log("run");
    return <CardLoadingSkeleton></CardLoadingSkeleton>;
  }
  return (
    data && (
      <div className=" flex flex-col w-full justify-center items-center border-t-2 border-b-2 border-elife-700 ">
        <div className=" text-white rounded-lg  w-full  p-4 md:p-10">
          <div className="flex space-x-4 items-center ">
            <div className="w-14 relative">
              {isCeleb && (
                <AiFillCheckCircle className="w-4 h-4 right-0 absolute bottom-0  fill-blue-600"></AiFillCheckCircle>
              )}

              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className=" w-12 h-12 overflow-hidden rounded-full"
                />
              ) : (
                <AiOutlineUser className=" fill-elife-700 w-12 h-12 border-2 rounded-full border-elife-700"></AiOutlineUser>
              )}
            </div>
            <div className="w-full">
              <div className="flex flex-col md:flex-row  items-start md:space-x-2 md:items-center">
                <h2 className="text:sm md:text-base font-bold">{username}</h2>
                <div className="w-full text-xs  md:text-sm text-elife-500 flex  items-center justify-between">
                  <div>
                    {" "}
                    {type === "track" ? "is listening to " : "is watching "}
                    <span className="text-blue-500">&nbsp; "{data.name}"</span>
                  </div>
                  <div>
                    {type !== "track" ? (
                      <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/bubbles/50/tv.png"
                        alt="tv"
                      />
                    ) : (
                      <img
                        width="50"
                        height="50"
                        src="https://img.icons8.com/bubbles/50/music.png"
                        alt="music"
                      />
                    )}
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-elife-500">
                Shared: {customDate}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-[70%] md:w-[50%] mt-2">
              {type === "track" && (
                <TrackCard
                  name={data.name}
                  artists={
                    data.artists && data.artists.map((name: any) => ({ name }))
                  }
                  image_src={`http://localhost:8080/track/image/${data.id}`}
                ></TrackCard>
              )}
              {type === "tvShow" && (
                <MovieCard
                  image_src={`http://localhost:8080/tvShow/image/${data.id}`}
                  name={data.name}
                  origin_country={[data.origin_country]}
                  genres={data.genre}
                  isDisable
                  sm
                ></MovieCard>
              )}
            </div>

            <div
              className={`flex flex-col text-xs md:text-sm  pt-4  ${
                data.vibes && data.vibes.length > 0
                  ? "border-none md:border-l-2 w-[50%]"
                  : ""
              } border-elife-700`}
            >
              {data.vibes && data.vibes.length > 0 ? (
                <div className="ml-4">
                  Described this track as{" "}
                  {data.vibes.map((title: string) => (
                    <Chip title={title} key={title}></Chip>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            {" "}
            {data.like ? (
              <div>
                <span className="text-lg text-elife-500 font-extrabold">
                  {username}{" "}
                </span>{" "}
                recommend this track
              </div>
            ) : (
              <div></div>
            )}
            {!isCurrentUser ? (
              isLoggedIn && (
                <Button label="Vibe now" sm onClick={setShareModal}></Button>
              )
            ) : (
              <FiDelete
                className="w-6 h-6 cursor-pointer"
                onClick={onDelete}
              ></FiDelete>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Post;
