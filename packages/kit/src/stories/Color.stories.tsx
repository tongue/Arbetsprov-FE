import { Meta } from "@storybook/react";
import { ColorBlock, Grid } from "./Theme";

export default {
  title: "Theme/Colors",
} as Meta;

const baseColors = ["base-pale", "base-black", "base-white"];
const brandColors = [
  "brand-yellow",
  "brand-red",
  "brand-blue",
  "brand-blue-sky",
  "brand-green",
];
const themeColors = [
  "foreground",
  "background",
  "negative",
  "highlight",
  "cold",
  "lukewarm",
  "hot",
];

export const Base = () => (
  <Grid>
    {baseColors.map((color) => (
      <ColorBlock id={color} />
    ))}
  </Grid>
);

export const Brand = () => (
  <Grid>
    {brandColors.map((color) => (
      <ColorBlock id={color} />
    ))}
  </Grid>
);

export const Theme = () => (
  <Grid>
    {themeColors.map((color) => (
      <ColorBlock id={color} />
    ))}
  </Grid>
);
