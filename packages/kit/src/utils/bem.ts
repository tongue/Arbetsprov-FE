import clsx from "clsx";

export const modifier = (blockOrElement: string, modifier: string) =>
  `${blockOrElement}--${modifier}`;

export const element = (block: string, element: string): string =>
  `${block}__${element}`;

// function createModule([block, blockModifiers]: [string, ], [element, elementModifiers][]) {
//   return {}
// }

// const appGrid = createModule("app-grid");

// const autocomplete = createModule("autocomplete", [
//   "comboBox",
//   "label",
//   "input",
//   ["button", ["status", "loading"]],
//   "menu",
//   "menuItem",
//   "menuItemActive",
// ]);

// const circleButton = createModule("circle-button");

// const listGrid = createModule("list-grid");

// const pageGrid = createModule("page-grid");

// const stack = createModule([
//   "stack",
//   [
//     ["offset", ["xs", "s", "m", "l", "xl"]],
//     ["anchor", ["top-left", "top-right"]],
//   ],
// ]);

// const weatherCard = createModule(
//   ["weather-card", ["temperature", ["hot", "lukewarm", "cold"]]],
//   [
//     "icon",
//     "temperature",
//     "temperature-unit",
//     "temperature-value",
//     "city",
//     "country",
//     "heading",
//   ]
// );

type BemCssClass = string;
type BemModifierParameter = string;
type BemModifierValue = string;
type BemModifier =
  | [BemModifierParameter, BemModifierValue]
  | [BemModifierParameter, BemModifierValue[]];
type BemElementWithModifier =
  | [BemCssClass, BemModifier]
  | [BemCssClass, BemModifier[]];
type BemElement = BemCssClass | BemElementWithModifier;

const elementWithModifiers = <Type>(
  elementWithModifiers: BemElementWithModifier,
  props: Type
): Record<BemCssClass, boolean> => {
  if (Array.isArray(modifiers)) {
  }
};

const createModule = <Type>(
  block: BemElement,
  elements: BemElement | BemElement[]
) => (props: Type) => {
  if (typeof elements === "undefined") {
    return {
      block: Array.isArray(block)
        ? elementWithModifiers<Type>(block, props)
        : block,
    };
  }
};
