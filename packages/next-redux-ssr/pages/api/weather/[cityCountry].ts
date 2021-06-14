import type { NextApiRequest, NextApiResponse } from "next";
import { weatherTags } from "../../../features/weather/weatherTag";
import { Weather } from "../../../features/weather/weatherSlice";
import { getWeatherStack } from "../../../api";
import { isString } from "../../../utils";
import { generateCityId } from "../suggestions/[name]";

const decodeWeather = (
  name: string,
  country: string,
  weather: WeatherStackResponse
): Weather => ({
  city: generateCityId(name, country),
  temperature: weather.current.temperature,
  tags: weatherTags(weather.current.weather_code),
});

type WeatherApiResponse = Weather | { message: string };

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherApiResponse>
): Promise<void> {
  const { cityCountry } = req.query;
  if (isString(cityCountry)) {
    try {
      const response = await getWeatherStack(cityCountry);
      const [name, country] = cityCountry.split(",");
      const weather = decodeWeather(name.trim(), country.trim(), response.data);
      res.status(200).json(weather);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Could not find city" });
    }
  } else {
    res.status(404).json({ message: "Incorrect cityCountry" });
  }
}

export default handler;
