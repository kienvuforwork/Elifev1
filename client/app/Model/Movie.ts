export interface TvShowModel  {
  type: "tvShow",
    id : number,
    name:string,
    vote_average: number,
    poster_path?: string,
    backdrop_path?:string,
    overview?:string,
    genre_ids?: number[],
    origin_country?: string[],
    vibes?:string[];
    genre?: string
  }