import { Meta } from "@storybook/react";
import listGrid from "../modules/list-grid";
import { Hot, Lukewarm, Cold } from "./WeatherCard.stories";

export default {
  title: "Modules/listGrid",
} as Meta;

export const Default = () => {
  const styles = listGrid();
  return (
    <ol className={styles.block}>
      <li>
        <Hot />
      </li>
      <li>
        <Lukewarm />
      </li>
      <li>
        <Cold />
      </li>
    </ol>
  );
};
