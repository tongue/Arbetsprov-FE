import weatherCard from "../modules/weather-card";
import { ReactComponent as IconSun } from "../assets/weather-icons/sun.svg";
import { ReactComponent as IconSnow } from "../assets/weather-icons/snow.svg";
import { ReactComponent as IconCloud } from "../assets/weather-icons/cloud.svg";
import { ReactComponent as IconRain } from "../assets/weather-icons/rain.svg";

type Tag = "sun" | "cloud" | "snow" | "rain";

export interface WeatherCardProps {
  temperature: number;
  city: string;
  country: string;
  tags: Tag[];
}

const getTemperatureLabel = (
  temperature: number
): "hot" | "lukewarm" | "cold" => {
  if (temperature > 20) return "hot";
  if (temperature < 0) return "cold";
  return "lukewarm";
};

const tagIconMap: Record<Tag, any> = {
  sun: IconSun,
  rain: IconRain,
  snow: IconSnow,
  cloud: IconCloud,
};

const getIcon = (tags: Tag[]) =>
  tags.reduce((_, currentTag) => tagIconMap[currentTag], IconSun);

function WeatherCard({
  city,
  country,
  temperature,
  tags,
}: WeatherCardProps): JSX.Element {
  const styles = weatherCard({ temperature: getTemperatureLabel(temperature) });
  const Icon = getIcon(tags);
  return (
    <article className={styles.block}>
      <header className={styles.city}>
        <h2 className={styles.heading}>
          {city} <span className={styles.country}>{country}</span>
        </h2>
      </header>
      <div className={styles.temperature}>
        {temperature}
        <abbr
          className={styles.temperatureUnit}
          title="Degrees Celsius"
        >{`°`}</abbr>
      </div>
      <figure className={styles.icon}>
        <Icon />
      </figure>
    </article>
  );
}

export default WeatherCard;
