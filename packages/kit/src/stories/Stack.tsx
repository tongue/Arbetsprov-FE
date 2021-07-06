import { ReactNode } from "react";
import stack, { Spacing } from "../modules/stack";
import { StackAnchor } from "../modules/stack";

export interface StackProps {
  anchor: StackAnchor;
  offset?: Spacing;
  children: ReactNode;
}

function Stack({ anchor, offset, children }: StackProps): JSX.Element {
  const styles = stack({ anchor, offset });
  return <div className={styles.block}>{children}</div>;
}

export default Stack;
