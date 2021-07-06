import { Meta } from "@storybook/react";
import Stack from "./Stack";
import WeatherCard from "./WeatherCard";
import CircleButton from "./CircleButton";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";

export default {
  component: Stack,
  title: "Modules/Stack",
} as Meta;

export const TopRightOffsetXs = () => (
  <Stack anchor="top-right" offset="xs">
    <WeatherCard
      city="Rio de Janeiro"
      country="Brazil"
      temperature={26}
      tags={["sun"]}
    />
    <CircleButton>
      <CloseIcon />
    </CircleButton>
  </Stack>
);
