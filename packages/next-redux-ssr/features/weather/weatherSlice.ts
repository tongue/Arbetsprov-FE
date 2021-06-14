import {
  AsyncThunkAction,
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ApiStatus, get, weatherEndpoint } from "../../api";
import {
  City,
  cityAdded,
  CityId,
  createSelectCity,
} from "../cities/citiesSlice";
import { AppState, AppThunk } from "../../store";
import type { WeatherTag } from "./weatherTag";
import { useDispatch, useSelector } from "react-redux";

const name = "weather";

export interface Weather {
  city: CityId;
  temperature: number;
  tags: WeatherTag[];
}

export interface WeatherState {
  items: Weather[];
  status: ApiStatus;
  error?: string;
}

const initialState: WeatherState = {
  items: [],
  status: "idle",
  error: null,
};

export const hydrate = createAction<AppState>(HYDRATE);

const getWeatherFromApi = async (city: City) => {
  const { data } = await get<Weather>(
    weatherEndpoint(`${city.name}, ${city.country}`)
  );
  return data;
};

export const fetchWeatherForCitySsr =
  (city: City): AppThunk =>
  async (dispatch) => {
    dispatch(cityAdded(city));
    try {
      const weather = await getWeatherFromApi(city);
      dispatch(weatherAdded(weather));
    } catch (error) {
      console.error("-- fetchWeatherForCitySsr", error);
    }
  };

export const fetchWeatherForCityActionType = `${name}/fetchWeatherForCity`;
export const fetchWeatherForCity = createAsyncThunk(
  fetchWeatherForCityActionType,
  async (city: City, { dispatch }) => {
    dispatch(cityAdded(city));

    return getWeatherFromApi(city);
  }
);

export const weatherSlice = createSlice({
  name,
  initialState,
  reducers: {
    weatherAdded(state, action: PayloadAction<Weather>) {
      state.items.push(action.payload);
    },
    weatherFailed(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: ({ addCase }) => {
    addCase(hydrate, (state, action) => ({
      ...state,
      ...action.payload.weather,
    }));
    addCase(fetchWeatherForCity.pending, (state) => {
      state.status = "loading";
    });
    addCase(fetchWeatherForCity.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items.push(action.payload);
    });
    addCase(fetchWeatherForCity.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { weatherAdded, weatherFailed } = weatherSlice.actions;

export const selectAllWeather = (state: AppState): Weather[] =>
  state.weather.items;

export const useWeatherActions = (): {
  fetchForCity: (city: City) => AsyncThunkAction<Weather, City, unknown>;
} => {
  const dispatch = useDispatch();

  const dispatchFetchWeatherForCity = (city: City) =>
    dispatch(fetchWeatherForCity(city));

  return {
    fetchForCity: dispatchFetchWeatherForCity,
  };
};

export const useCityWeather = (cityId: CityId): [City, Weather[]] => {
  const city = useSelector(createSelectCity(cityId));
  const cityWeather = useSelector<AppState, Weather[]>((state) =>
    state.weather.items.filter((item) => item.city === cityId).reverse()
  );

  return [city, cityWeather];
};
