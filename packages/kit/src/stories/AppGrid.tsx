import { ReactNode } from "react";
import appGrid from "../modules/app-grid";

const AppGrid = ({ children }: { children: ReactNode }) => {
  const styles = appGrid();
  return <div className={styles.block}>{children}</div>;
};

export default AppGrid;
