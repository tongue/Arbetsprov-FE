import { ReactNode } from "react";
import circleButton from "../modules/circle-button";

export interface CircleButtonProps {
  children: ReactNode;
}

function CircleButton({ children }: CircleButtonProps): JSX.Element {
  const styles = circleButton();
  return <button className={styles.block}>{children}</button>;
}

export default CircleButton;
