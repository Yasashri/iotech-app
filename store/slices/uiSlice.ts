import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isSearchOpen: boolean;
  isServicesDropdownOpen: boolean;
}

const initialState: UIState = {
  isSearchOpen: false,
  isServicesDropdownOpen: false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSearch(state) {
      state.isSearchOpen = !state.isSearchOpen;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
    toggleServicesDropdown(state) {
      state.isServicesDropdownOpen = !state.isServicesDropdownOpen;
    },
    closeServicesDropdown(state) {
      state.isServicesDropdownOpen = false;
    }
  }
});

export const {
  toggleSearch,
  closeSearch,
  toggleServicesDropdown,
  closeServicesDropdown
} = uiSlice.actions;

export default uiSlice.reducer;
