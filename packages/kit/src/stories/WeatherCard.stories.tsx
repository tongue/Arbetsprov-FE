import React from "react";
import { Meta, Story } from "@storybook/react";
import WeatherCard from "./WeatherCard";
import { WeatherCardProps } from "./WeatherCard";

export default {
  component: WeatherCard,
  title: "Modules/WeatherCard",
} as Meta;

const Template: Story<WeatherCardProps> = (args) => <WeatherCard {...args} />;

export const Hot = Template.bind({});
Hot.args = {
  city: "Rio de Janeiro",
  country: "Brazil",
  temperature: 26,
  tags: ["sun"],
};
export const Lukewarm = Template.bind({});
Lukewarm.args = {
  city: "Amsterdam",
  country: "Netherlands",
  temperature: 16,
  tags: ["cloud"],
};
export const Cold = Template.bind({});
Cold.args = {
  city: "Stockholm",
  country: "Sweden",
  temperature: -6,
  tags: ["snow"],
};
