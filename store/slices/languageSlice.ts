import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Locale = "en" | "ar";

interface LanguageState {
  currentLocale: Locale;
  direction: "ltr" | "rtl";
}

const initialState: LanguageState = {
  currentLocale: "en",
  direction: "ltr"
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      state.currentLocale = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
    }
  }
});

export const { setLocale } = languageSlice.actions;
export default languageSlice.reducer;
