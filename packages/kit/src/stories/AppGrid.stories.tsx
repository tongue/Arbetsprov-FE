import { Meta } from "@storybook/react";
import AppGrid from "./AppGrid";
import ListGrid from "./ListGrid";
import WeatherCard, { WeatherCardProps } from "./WeatherCard";
import Autocomplete from "./Autocomplete";

export default {
  component: AppGrid,
  title: "Modules/AppGrid",
} as Meta;

const weatherItems: WeatherCardProps[] = [
  {
    temperature: 20,
    city: "Stockholm",
    country: "Sweden",
    tags: ["rain"],
  },
  {
    temperature: -10,
    city: "Reykjavik",
    country: "Iceland",
    tags: ["snow"],
  },
  {
    temperature: 45,
    city: "Rio de Janeiro",
    country: "Brazil",
    tags: ["sun"],
  },
  {
    temperature: 15,
    city: "Amsterdam",
    country: "Netherlands",
    tags: ["cloud"],
  },
];

export const app = () => (
  <AppGrid>
    <h1>Hows the weather in...</h1>
    <Autocomplete />
    <ListGrid>
      {weatherItems.map((item) => (
        <WeatherCard key={item.city + item.country} {...item} />
      ))}
    </ListGrid>
  </AppGrid>
);
