import React, { ReactSVGElement } from "react";
import { CityId } from "../cities/citiesSlice";
import { notUndefined } from "../../utils";
import { useCityWeather } from "./weatherSlice";
import {
  weatherCard,
  SunIcon,
  RainIcon,
  SnowIcon,
  CloudIcon,
} from "@isotop/kit";

export interface CityWeatherProps {
  cityId: CityId;
}

type Tag = "sun" | "cloud" | "snow" | "rain";

const tagIconMap: Record<Tag, () => ReactSVGElement> = {
  sun: SunIcon,
  rain: RainIcon,
  snow: SnowIcon,
  cloud: CloudIcon,
};

const getIcon = (tags: Tag[]) =>
  tags.reduce((_, currentTag) => tagIconMap[currentTag], SunIcon);

const getTemperatureLabel = (
  temperature?: number
): "hot" | "lukewarm" | "cold" => {
  if (temperature > 20) return "hot";
  if (temperature < 0) return "cold";
  return "lukewarm";
};

const WeatherCard = ({ cityId }: CityWeatherProps): JSX.Element => {
  const [city, [latestWeather]] = useCityWeather(cityId);
  const styles = weatherCard({
    temperature: getTemperatureLabel(latestWeather?.temperature),
  });
  const Icon = getIcon(latestWeather.tags);

  return (
    <article className={styles.block}>
      <header className={styles.city}>
        <h2 className={styles.heading}>
          {city.name}, {city.country}
        </h2>
      </header>
      {notUndefined(latestWeather) ? (
        <React.Fragment>
          <div className={styles.temperature}>
            {`${latestWeather.temperature}`}
            <abbr
              className={styles.temperatureUnit}
              title="degrees Celsius"
            >{`°`}</abbr>
          </div>
          <figure className={styles.icon}>
            <Icon />
          </figure>
        </React.Fragment>
      ) : undefined}
    </article>
  );
};

export default WeatherCard;
