
import {TvShowModel} from "../../Model/Movie";
const token = process.env.MOVIEDB_TOKEN;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${token}`
  }
};



const  getMovies = async () => {
  const url = 'https://api.themoviedb.org/3/trending/tv/day?language=en-US';
  const data = await fetch(url, options)
  .then(res => res.json())
  .catch(err => console.error('error:' + err));
  const movies : TvShowModel[] = data.results;
  return movies;
}

export default getMovies;