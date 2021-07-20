import clsx from "clsx";
import { createElementClass, createModifierClass } from "../utils/bem";
import "../styles/weather-card.css";

interface WeatherCard {
  temperature?: "hot" | "lukewarm" | "cold";
}

function weatherCard({ temperature: _temperature }: WeatherCard) {
  const block = "weather-card";
  const icon = createElementClass(block, "icon");
  const temperature = createElementClass(block, "temperature");
  const city = createElementClass(block, "city");
  const country = createElementClass(block, "country");
  const heading = createElementClass(block, "heading");
  const temperatureValue = createElementClass(block, "temperature-value");
  const temperatureUnit = createElementClass(block, "temperature-unit");

  return {
    block: clsx(block, {
      [createModifierClass(block, "hot")]: _temperature === "hot",
      [createModifierClass(block, "lukewarm")]: _temperature === "lukewarm",
      [createModifierClass(block, "cold")]: _temperature === "cold",
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
