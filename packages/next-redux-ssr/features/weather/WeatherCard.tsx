import React from "react";
import { CityId } from "../cities/citiesSlice";
import { notUndefined } from "../../utils";
import { useCityWeather } from "./weatherSlice";

export interface CityWeatherProps {
  cityId: CityId;
}

const WeatherCard = ({ cityId }: CityWeatherProps): JSX.Element => {
  const [city, [latestWeather]] = useCityWeather(cityId);

  return (
    <article>
      <header>
        <h2>
          {city.name}, {city.country}
        </h2>
      </header>
      {notUndefined(latestWeather) ? (
        <React.Fragment>
          <div>
            <strong>{`${latestWeather.temperature}`}</strong>
            <abbr title="degrees Celsius">{`℃`}</abbr>
          </div>
          <ul>
            {latestWeather.tags.map((tag) => (
              <li key={`${city.id}-${tag}`}>{tag}</li>
            ))}
          </ul>
        </React.Fragment>
      ) : undefined}
    </article>
  );
};

export default WeatherCard;
