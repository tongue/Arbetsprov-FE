import React from "react";
import { wrapper } from "../store";
import { GetServerSidePropsResult, NextPage } from "next";
import AutocompleteCitySuggestions from "../features/suggestions/AutocompleteCitySuggestions";
import CityWeatherList from "../features/cities/CityWeatherList";
import { URL } from "url";
import {
  fetchSuggestionsActionType,
  fetchSuggestionsSsr,
} from "../features/suggestions/suggestionsSlice";
import { cityRemoved } from "../features/cities/citiesSlice";
import {
  fetchWeatherForCityActionType,
  fetchWeatherForCitySsr,
} from "../features/weather/weatherSlice";
import { hasLength, logServerState } from "../utils";

const IndexPage: NextPage = () => {
  return (
    <React.Fragment>
      <AutocompleteCitySuggestions />
      <CityWeatherList />
    </React.Fragment>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({
      req,
    }): Promise<
      GetServerSidePropsResult<{ props: Record<string, unknown> }>
    > => {
      logServerState(store.getState(), "start");

      const { searchParams } = new URL(req.url, `http://${req.headers.host}`);

      const actionType = searchParams.get("actionType");

      if (actionType === fetchSuggestionsActionType) {
        const cityName = searchParams.get("cityName");
        if (hasLength(cityName)) {
          await store.dispatch(fetchSuggestionsSsr(cityName));
          logServerState(store.getState(), fetchSuggestionsActionType);
        }
      }

      if (actionType === fetchWeatherForCityActionType) {
        const cityId = searchParams.get("id");
        const name = searchParams.get("name");
        const country = searchParams.get("country");
        if (hasLength(cityId) && hasLength(name) && hasLength(country)) {
          const city = { id: cityId, name, country };
          await store.dispatch(fetchWeatherForCitySsr(city));
          logServerState(store.getState(), fetchWeatherForCityActionType);
        }
      }

      if (actionType === cityRemoved.type) {
        const cityId = searchParams.get("cityId");
        if (hasLength(cityId)) {
          store.dispatch(cityRemoved(cityId));
          logServerState(store.getState(), cityRemoved.type);
        }
      }

      logServerState(store.getState(), "end");

      return { props: undefined };
    }
);

export default IndexPage;
