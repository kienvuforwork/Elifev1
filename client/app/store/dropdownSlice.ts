import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DropdownState {
  isOpen: boolean;
}

const initialState: DropdownState = {
  isOpen: false,
};

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = dropdownSlice.actions;
export default dropdownSlice.reducer;