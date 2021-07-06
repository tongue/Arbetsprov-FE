import clsx from "clsx";
import { element, modifier } from "../utils/bem";
import "../styles/autocomplete.css";

type Status = "idle" | "loading" | "succeeded" | "failed";

interface Autocomplete {
  status?: Status;
}

function autocomplete({ status }: Autocomplete) {
  const block = "autocomplete";
  const comboBox = element(block, "combo-box");
  const label = element(block, "label");
  const input = element(block, "input");
  const button = element(block, "button");
  const menu = element(block, "menu");
  const menuItem = element(block, "menuItem");

  return {
    block: clsx(block),
    comboBox,
    label,
    input,
    button: clsx(button, {
      [modifier(button, "status-loading")]: status === "loading",
    }),
    menu,
    menuItem: clsx(menuItem),
    menuItemActive: clsx(menuItem, modifier(menuItem, "active")),
  };
}

export default autocomplete;
