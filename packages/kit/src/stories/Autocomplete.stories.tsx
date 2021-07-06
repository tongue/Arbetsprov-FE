import { Meta } from "@storybook/react";
import Autocomplete from "./Autocomplete";

export default {
  component: Autocomplete,
  title: "Modules/Autocomplete",
} as Meta;

export const idle = () => <Autocomplete />;
export const loading = () => <Autocomplete status="loading" />;
export const succeeded = () => <Autocomplete status="succeeded" />;
