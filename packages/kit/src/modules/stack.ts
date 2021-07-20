import clsx from "clsx";
import { createModifierClass } from "../utils/bem";
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
        [createModifierClass(block, "offset-xs")]: offset === "xs",
        [createModifierClass(block, "offset-s")]: offset === "s",
        [createModifierClass(block, "offset-m")]: offset === "m",
        [createModifierClass(block, "offset-l")]: offset === "l",
        [createModifierClass(block, "offset-xl")]: offset === "xl",
      },
      {
        [createModifierClass(block, "top-left")]: anchor === "top-left",
        [createModifierClass(block, "top-right")]: anchor === "top-right",
      }
    ),
  };
}

export default stack;
