import { ReactNode } from "react";
import pageGrid from "../modules/page-grid";

const PageGrid = ({ children }: { children: ReactNode }) => {
  const styles = pageGrid();
  return <div className={styles.block}>{children}</div>;
};

export default PageGrid;
