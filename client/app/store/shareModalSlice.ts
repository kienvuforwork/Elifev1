 
 
 import { createSlice } from "@reduxjs/toolkit";
  import { PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../Model/Music";
import { TvShowModel } from "../Model/Movie";
  interface shareModalState {
    isOpen: boolean;
    isChosen: boolean
    data?:Track | TvShowModel
  }

  const initialState: shareModalState = {
    isOpen: false,
    isChosen:false
  };

  const shareModalSlice = createSlice({
    name: "shareModal",
    initialState,
    reducers: {
      onOpen: (state) => {
        state.isOpen = true;
      },
      onClose: (state) => {
        state.isOpen = false;
      },
    setIsChosen: (state, action:PayloadAction<boolean> ) => {
      state.isChosen = action.payload
    },
    setData: (state, action:PayloadAction<TvShowModel|Track> ) => {
      state.data = action.payload
    }
    },
  });

  export const { onOpen, onClose,setIsChosen, setData } = shareModalSlice.actions;
  export default shareModalSlice.reducer;
