import { TvShowModel } from "./Movie"
import { Track } from "./Music"

export interface User {
    _id:string;
    username: string,
    email?: string,
    avatar?: string,
    isCeleb?:boolean, 
    followers?: [string]
    following?:[string]
    tvShowWatching?:[TvShowModel]
    listeningTrack?: [Track]
    posts?:[string] 
}