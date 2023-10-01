"use client";

import CardLoadingSkeleton from "./cardLoadingSkeleton";

interface TrackCardProps {
  name: string;
  artists: any;
  image_src: string;
  isLoading?: boolean;
  releaseDate?: string;
  duration?: number;
  hover?: boolean;
  sm?: boolean;
  border?: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({
  name,
  artists,
  image_src,
  isLoading,
  releaseDate,
  duration,
  hover,
  border,
}) => {
  if (isLoading) {
    return <CardLoadingSkeleton></CardLoadingSkeleton>;
  }
  let minutes;
  let seconds;
  if (duration) {
    minutes = Math.floor(duration / 60000);
    seconds = ((duration % 60000) / 1000).toFixed(0).padStart(2, "0");
  }
  return (
    <div
      className={`flex  md:text-xs lg:text-md xl:gap-5 gap-2 w-full xl:p-5 md:p-3 p-1 ${
        border && "border-t-2"
      } border-elife-700  ${hover && "cursor-pointer hover:bg-elife-700"} `}
    >
      <div className={`w-1/3`}>
        <img src={image_src} alt="" />{" "}
      </div>
      <div className="flex flex-col w-2/3 gap-2">
        <div
          className={`xl:text-sm font-medium text-xs  ${
            hover && "hover:cursor-pointer"
          } `}
        >
          <a className="text-elife-500"> {name}</a>
          <div className="flex flex-wrap gap-1 mt-1">
            {artists &&
              artists.map((artist: any, index: number) => (
                <span className=" text-elife-600" key={index}>
                  {index === artists.length - 1
                    ? artist.name
                    : artist.name + ","}
                </span>
              ))}
          </div>
          {releaseDate && (
            <div className="text-[12px] text-elife-600">
              Release Date: {releaseDate}
              {duration && (
                <div>
                  Duration: {minutes}:{seconds}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
