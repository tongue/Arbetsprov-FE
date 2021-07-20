import { Meta } from "@storybook/react";
import { CloseIcon } from "../assets/icons";
import circleButton from "../modules/circle-button";

export default {
  title: "Modules/circleButton",
} as Meta;

export const Default = () => {
  const styles = circleButton();
  return (
    <button className={styles.block}>
      <CloseIcon />
    </button>
  );
};
