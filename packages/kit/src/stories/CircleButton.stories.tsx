import { Meta } from "@storybook/react";
import CircleButton from "./CircleButton";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";

export default {
  component: CircleButton,
  title: "Modules/CircleButton",
} as Meta;

export const withIcon = () => (
  <CircleButton>
    <CloseIcon />
  </CircleButton>
);
