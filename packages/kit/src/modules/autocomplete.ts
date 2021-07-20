import clsx from "clsx";
import { createElementClass, createModifierClass } from "../utils/bem";
import "../styles/autocomplete.css";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface Autocomplete {
  status?: Status;
}

function autocomplete({ status }: Autocomplete) {
  const block = "autocomplete";
  const comboBox = createElementClass(block, "combo-box");
  const label = createElementClass(block, "label");
  const input = createElementClass(block, "input");
  const button = createElementClass(block, "button");
  const menu = createElementClass(block, "menu");
  const menuItem = createElementClass(block, "menuItem");

  return {
    block: clsx(block),
    comboBox,
    label,
    input,
    button: clsx(button, {
      [createModifierClass(button, "status-loading")]: status === "loading",
    }),
    menu,
    menuItem: clsx(menuItem),
    menuItemActive: clsx(menuItem, createModifierClass(menuItem, "active")),
  };
}

export default autocomplete;
