"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import CardLoadingSkeleton from "./cardLoadingSkeleton";

interface MovieCardProps {
  image_src?: string;
  name: string;
  rating?: number;
  isLoading?: boolean;
  isDisable?: boolean;
  overview?: string;
  genres?: string[] | null;
  origin_country?: string[];
  sm?: boolean;
  border?: boolean;
  col?: boolean;
  hover?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  image_src,
  name,
  rating,
  isLoading,
  isDisable,
  overview,
  genres,
  origin_country,
  sm,
  border,
  col,
  hover,
}) => {
  const convertRatingOutOf10ToOutOf5 = (ratingOutOf10: any) => {
    // Ensure the input is within the valid range
    if (ratingOutOf10 < 0 || ratingOutOf10 > 10) {
      throw new Error("Rating out of range. It should be between 0 and 10.");
    }

    // Convert the rating to a scale of 5
    const ratingOutOf5: number = ratingOutOf10 / 2;

    const fullStars = Math.floor(ratingOutOf5); // Number of full stars
    const halfStar = ratingOutOf5 - fullStars; // Whether to show a half star
    return { fullStars, halfStar };
  };

  const { fullStars, halfStar } = convertRatingOutOf10ToOutOf5(rating);

  const fullStarsIcon = () => {
    const starIcons = [];
    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ color: "yellow" }}
          className="xl:w-5 xl:h-5 h-3 w-3 mr-1"
        />
      );
    }
    return <div>{starIcons}</div>;
  };

  const halfStarsIcon = () => {
    if (halfStar) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            style={{ color: "yellow" }}
            className="xl:w-5 xl:h-5 h-3 w-3 mr-1  "
          />
        </div>
      );
    }
  };

  if (isLoading) {
    return <CardLoadingSkeleton></CardLoadingSkeleton>;
  }
  return (
    <div className="flex flex-col ">
      <div
        className={`flex xl:gap-5 gap-2 w-full xl:p-5 md:p-3 p-1  ${
          border ? "border-t-2" : ""
        }  border-elife-700 ${isDisable ? "" : "hover:bg-elife-700"} `}
      >
        <div className="w-2/5">
          {" "}
          <img src={image_src} className="w-full h-full"></img>
        </div>
        <div className={`flex flex-col w-2/3 ${sm ? "gap-1" : "gap-2`"} `}>
          <div
            className={` xl:text-lg font-medium md:text-sm sm:text-xs text-elife-500 ${
              isDisable ? "" : "hover:cursor-pointer"
            } `}
          >
            <a
              className={`${sm ? "text-sm leading-[1px] font-semibold " : ""} `}
            >
              {name}
            </a>
          </div>
          {rating ? (
            <div className="xl:text-sm text-xs">
              Rating: {rating?.toFixed(2)}{" "}
            </div>
          ) : (
            ""
          )}
          {rating ? (
            <div className="flex items-center">
              {fullStarsIcon()}
              {halfStarsIcon()}
            </div>
          ) : (
            ""
          )}
          {origin_country && (
            <div className={`${sm ? "text-sm" : ""}`}>
              Country:{" "}
              <img
                src={`https://flagcdn.com/16x12/${origin_country[0].toLowerCase()}.png`}
                alt={origin_country[0]}
                width="16"
                height="12"
                className="inline"
              />
            </div>
          )}
          {genres && (
            <div className={`${sm ? "text-sm" : ""}`}>
              <span>Genre:</span>
              {genres.map((genre, index: number) => (
                <span className="ml-[3px]" key={index}>
                  {index !== 0 && ", "}
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {overview && (
        <div className="text-sm text-elife-500 opacity-80 ">
          <span>Overview:</span> {overview}{" "}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
