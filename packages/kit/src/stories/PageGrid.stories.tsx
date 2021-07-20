import { Meta } from "@storybook/react";
import { Default as AppGrid } from "./AppGrid.stories";
import pageGrid from "../modules/page-grid";

export default {
  title: "Modules/pageGrid",
} as Meta;

export const Default = () => {
  const styles = pageGrid();
  return (
    <div className={styles.block}>
      <AppGrid />
    </div>
  );
};
