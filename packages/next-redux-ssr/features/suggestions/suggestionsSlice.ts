import {
  createSlice,
  createAsyncThunk,
  createAction,
  PayloadAction,
  ActionCreatorWithoutPayload,
  AsyncThunkAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus, suggestionsEndpoint, get } from "../../api";
import { City } from "../cities/citiesSlice";
import { AppState, AppThunk } from "../../store";
import { useDispatch, useSelector } from "react-redux";

const name = "suggestions";

const hydrated = createAction<AppState>(HYDRATE);

export type CitySuggestionsState = {
  items: City[];
  status: ApiStatus;
  error?: string;
};

const initialState: CitySuggestionsState = {
  items: [],
  status: "idle",
  error: null,
};

const getSuggestionsFromApi = async (input: string) => {
  const { data } = await get<City[]>(suggestionsEndpoint(input));
  return data;
};

export const fetchSuggestionsActionType = `${name}/fetchSuggestions`;

export const fetchSuggestions = createAsyncThunk(
  fetchSuggestionsActionType,
  async (input: string) => getSuggestionsFromApi(input)
);

export const fetchSuggestionsSsr =
  (input: string): AppThunk =>
  async (dispatch) => {
    try {
      const suggestions = await getSuggestionsFromApi(input);
      dispatch(suggestionsAdded(suggestions));
    } catch (error) {
      console.error("-- fetchSuggestionsSsr", error);
    }
  };

export const suggestionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    suggestionsCleared() {
      return initialState;
    },
    suggestionsAdded(state, action: PayloadAction<City[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(hydrated, (state, action) => ({
      ...state,
      ...action.payload.suggestions,
    }));
    addCase(fetchSuggestions.pending, (state) => {
      state.status = "loading";
    });
    addCase(fetchSuggestions.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    addCase(fetchSuggestions.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { suggestionsCleared, suggestionsAdded } =
  suggestionsSlice.actions;

export const selectSuggestionItems = (state: AppState): City[] =>
  state.suggestions.items;

export const selectSuggestionsStatus = (state: AppState): ApiStatus =>
  state.suggestions.status;

export const selectSuggestionsError = (state: AppState): string | null =>
  state.suggestions.error;

export const useSuggestions = (): {
  items: City[];
  status: ApiStatus;
  error?: string;
} => {
  const items = useSelector(selectSuggestionItems);
  const status = useSelector(selectSuggestionsStatus);
  const error = useSelector(selectSuggestionsError);

  return {
    items,
    status,
    error,
  };
};

export const useSuggestionsActions = (): {
  fetch: (input: string) => AsyncThunkAction<City[], string, unknown>;
  clear: () => ActionCreatorWithoutPayload<string>;
} => {
  const dispatch = useDispatch();
  const dispatchFetchSuggestions = (input: string) =>
    dispatch(fetchSuggestions(input));
  const dispatchSuggestionsCleared = () => dispatch(suggestionsCleared);

  return {
    fetch: dispatchFetchSuggestions,
    clear: dispatchSuggestionsCleared,
  };
};
