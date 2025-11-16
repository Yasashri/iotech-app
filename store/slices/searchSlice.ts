import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchTab = "services" | "teams";

interface SearchState {
  query: string;
  activeTab: SearchTab;
  currentPage: number;
}

const initialState: SearchState = {
  query: "",
  activeTab: "services",
  currentPage: 1
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setActiveTab(state, action: PayloadAction<SearchTab>) {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  }
});

export const { setQuery, setActiveTab, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
