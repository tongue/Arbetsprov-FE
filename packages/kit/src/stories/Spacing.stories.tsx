import { Meta } from "@storybook/react";
import { Grid, SpacingBlock } from "./Theme";

export default {
  title: "Theme/Spacing",
} as Meta;

const baseSpacings = ["m", "l", "xl"];
const themeSpacings = ["gap"];

export const Base = () => (
  <Grid>
    {baseSpacings.map((spacing) => (
      <SpacingBlock id={spacing} />
    ))}
  </Grid>
);

export const Theme = () => (
  <Grid>
    {themeSpacings.map((spacing) => (
      <SpacingBlock id={spacing} />
    ))}
  </Grid>
);
