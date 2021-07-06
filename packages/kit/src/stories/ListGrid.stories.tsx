import { Meta } from "@storybook/react";
import ListGrid from "./ListGrid";
import WeatherCard, { WeatherCardProps } from "./WeatherCard";

export default {
  component: ListGrid,
  title: "Modules/ListGrid",
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

export const withIcon = () => (
  <ListGrid>
    {weatherItems.map((item) => (
      <WeatherCard key={item.city + item.country} {...item} />
    ))}
  </ListGrid>
);
