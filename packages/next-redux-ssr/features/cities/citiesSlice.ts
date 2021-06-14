import {
  createSlice,
  PayloadAction,
  createAction,
  Selector,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../store";

const name = "cities";

const hydrated = createAction<AppState>(HYDRATE);

export type CityId = string;

export interface City {
  [key: string]: string;
  id: CityId;
  name: string;
  country: string;
}

const initialState: City[] = [];

export const citiesSlice = createSlice({
  name,
  initialState,
  reducers: {
    cityAdded(state, action: PayloadAction<City>) {
      state.push(action.payload);
    },
    cityRemoved(state, action: PayloadAction<CityId>) {
      return state.filter((city: City) => city.id !== action.payload);
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(hydrated, (_, action) => action.payload.cities);
  },
});

export const { cityAdded, cityRemoved } = citiesSlice.actions;

export const selectCities = (state: AppState): City[] => state.cities;

export const createSelectCity =
  (cityId: CityId): Selector<AppState, City> =>
  (state: AppState) =>
    state.cities.find((city) => city.id === cityId);

export const useCities = (): City[] => useSelector(selectCities);

export const useCitiesAction = (): {
  removeCity: (id: CityId) => () => {
    payload: string;
    type: string;
  };
} => {
  const dispatch = useDispatch();
  const dispatchRemoveCity = (id: CityId) => () => dispatch(cityRemoved(id));

  return { removeCity: dispatchRemoveCity };
};
