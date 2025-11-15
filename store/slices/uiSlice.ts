import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isSearchOpen: boolean;
  isServicesDropdownOpen: boolean;
  isMobileMenuOpen: boolean;
}

const initialState: UIState = {
  isSearchOpen: false,
  isServicesDropdownOpen: false,
  isMobileMenuOpen: false
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
    },
    toggleMobileMenu(state) {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.isMobileMenuOpen = false;
    }
  }
});

export const {
  toggleSearch,
  closeSearch,
  toggleServicesDropdown,
  closeServicesDropdown,
  toggleMobileMenu,
  closeMobileMenu
} = uiSlice.actions;

export default uiSlice.reducer;
