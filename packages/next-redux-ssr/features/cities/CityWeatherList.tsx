import React from "react";
import ActionButton from "../../components/ActionButton";
import { hasLength } from "../../utils";
import WeatherCard from "../weather/WeatherCard";
import { cityRemoved, useCities, useCitiesAction } from "./citiesSlice";

const CityWeatherList = (): JSX.Element => {
  const cities = useCities();
  const { removeCity } = useCitiesAction();

  return hasLength(cities) ? (
    <ol>
      {cities.map((city) => (
        <li key={city.id}>
          <WeatherCard cityId={city.id} />
          <ActionButton
            actionType={cityRemoved.type}
            values={{ cityId: city.id }}
            onClick={removeCity(city.id)}
          >
            Remove
          </ActionButton>
        </li>
      ))}
    </ol>
  ) : (
    <h2>No cities added</h2>
  );
};

export default CityWeatherList;
