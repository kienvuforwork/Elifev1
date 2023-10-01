
import {  TvShowModel } from "../../Model/Movie";
const token = process.env.MOVIEDB_TOKEN;

export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`}
};



export const  getPopularTvShow = async () => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const data = await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  const tvShows : TvShowModel[] = data.results;
  return tvShows;
}

export const getTvShowGenre =async () => {
  const url = "https://api.themoviedb.org/3/genre/tv/list";
  const data = await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  return data;
}