export interface TrackModel  {
    type:"tracks",
    track:{    
        artists: string[],
        id:string
        name:string,
        album: {
            images:[{
                url:string
            }]
               
            
        }
    }


  }
  export interface Track{
    type:"track",
        artists: string[],
        id:string,
        duration_ms?:number,
        name:string,
        album: {
            images:[{
                url:string
            }],
            release_date?:string,
            
               
            
        }
   
  }