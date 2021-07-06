import { ReactNode } from "react";
import listGrid from "../modules/list-grid";

const ListGrid = ({ children }: { children: ReactNode }): JSX.Element => {
  const styles = listGrid();
  return <div className={styles.block}>{children}</div>;
};

export default ListGrid;
