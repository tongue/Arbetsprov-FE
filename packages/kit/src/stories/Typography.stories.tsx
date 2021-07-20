import { Meta } from "@storybook/react";
import { TextSize } from "./Theme";

export default {
  title: "Theme/Typography",
} as Meta;

const baseSizes = ["3xl", "2xl", "xl", "l", "m", "s"];

const themeSizes = ["display", "heading", "input", "body"];

export const BaseSize = () => baseSizes.map((size) => <TextSize id={size} />);

export const ThemeSizes = () =>
  themeSizes.map((size) => <TextSize id={size} />);
