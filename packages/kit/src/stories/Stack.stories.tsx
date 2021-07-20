import { Meta } from "@storybook/react";
import { Hot as WeatherCard } from "./WeatherCard.stories";
import { Default as CloseButton } from "./CircleButton.stories";
import stack from "../modules/stack";

export default {
  title: "Modules/stack",
} as Meta;

export const Default = () => {
  const styles = stack({ anchor: "top-right", offset: "xs" });
  return (
    <div className={styles.block}>
      <WeatherCard />
      <CloseButton />
    </div>
  );
};
