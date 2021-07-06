import React from "react";
import ActionButton from "../../components/ActionButton";
import { hasLength } from "../../utils";
import WeatherCard from "../weather/WeatherCard";
import { cityRemoved, useCities, useCitiesAction } from "./citiesSlice";
import { circleButton, stack, CloseIcon } from "@isotop/kit";

const CityWeatherList = (): JSX.Element => {
  const cities = useCities();
  const { removeCity } = useCitiesAction();
  const itemStyles = stack({ anchor: "top-right", offset: "xs" });
  const removeButtonStyles = circleButton();

  return hasLength(cities) ? (
    <ol>
      {cities.map((city) => (
        <li className={itemStyles.block} key={city.id}>
          <WeatherCard cityId={city.id} />
          <ActionButton
            className={removeButtonStyles.block}
            actionType={cityRemoved.type}
            values={{ cityId: city.id }}
            onClick={removeCity(city.id)}
            aria-label="Remove"
          >
            <CloseIcon />
          </ActionButton>
        </li>
      ))}
    </ol>
  ) : (
    <h2>No cities added</h2>
  );
};

export default CityWeatherList;
