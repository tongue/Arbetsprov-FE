import React from "react";
import { Meta } from "@storybook/react";
import Theme from "./Theme";

export default {
  component: Theme,
  title: "Theme",
} as Meta;

export const CSS: React.VFC<{}> = () => <Theme />;
