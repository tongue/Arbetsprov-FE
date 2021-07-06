import clsx from "clsx";
import { element, modifier } from "../utils/bem";
import "../styles/weather-card.css";

interface WeatherCard {
  temperature?: "hot" | "lukewarm" | "cold";
}

function weatherCard({ temperature: _temperature }: WeatherCard) {
  const block = "weather-card";
  const icon = element(block, "icon");
  const temperature = element(block, "temperature");
  const city = element(block, "city");
  const country = element(block, "country");
  const heading = element(block, "heading");
  const temperatureValue = element(block, "temperature-value");
  const temperatureUnit = element(block, "temperature-unit");

  return {
    block: clsx(block, {
      [modifier(block, "hot")]: _temperature === "hot",
      [modifier(block, "lukewarm")]: _temperature === "lukewarm",
      [modifier(block, "cold")]: _temperature === "cold",
    }),
    icon,
    temperature,
    temperatureUnit,
    temperatureValue,
    city,
    country,
    heading,
  };
}

export default weatherCard;
