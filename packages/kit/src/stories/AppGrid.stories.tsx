import { Meta } from "@storybook/react";
import { Default as ListGrid } from "./ListGrid.stories";
import { Idle as Autocomplete } from "./Autocomplete.stories";
import appGrid from "../modules/app-grid";

export default {
  title: "Modules/appGrid",
} as Meta;

export const Default = () => {
  const styles = appGrid();
  return (
    <main className={styles.block}>
      <h1>Hows the weather in...</h1>
      <Autocomplete />
      <ListGrid />
    </main>
  );
};
