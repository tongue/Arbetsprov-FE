import clsx from "clsx";
import { modifier } from "../utils/bem";
import "../styles/stack.css";

export type StackAnchor = "top-right" | "top-left";
export type Spacing = "xs" | "s" | "m" | "l" | "xl";

interface Stack {
  anchor?: StackAnchor;
  offset?: Spacing;
}

function stack({ anchor = "top-right", offset = "xs" }: Stack) {
  const block = "stack";

  return {
    block: clsx(
      block,
      {
        [modifier(block, "offset-xs")]: offset === "xs",
        [modifier(block, "offset-s")]: offset === "s",
        [modifier(block, "offset-m")]: offset === "m",
        [modifier(block, "offset-l")]: offset === "l",
        [modifier(block, "offset-xl")]: offset === "xl",
      },
      {
        [modifier(block, "top-left")]: anchor === "top-left",
        [modifier(block, "top-right")]: anchor === "top-right",
      }
    ),
  };
}

export default stack;
