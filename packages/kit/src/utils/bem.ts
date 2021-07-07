import clsx from "clsx";

export const modifier = (blockOrElement: BemElement, modifier: string) =>
  `${blockOrElement}--${modifier}`;

export const element = (block: BemElement, element: BemElement): string =>
  `${block}__${element}`;

const kebabToCamel = (str: string): string =>
  str
    .split("-")
    .map((item, index) =>
      index
        ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()
        : item.toLowerCase()
    )
    .join("");

type BemCssClass = string;
type BemModifierParameter = string;
type BemModifierValue = string;
type BemModifier =
  | BemModifierParameter
  | [BemModifierParameter, BemModifierValue[]];
type BemElementWithModifier =
  | [BemCssClass, BemModifier]
  | [BemCssClass, BemModifier[]];
type BemElement = BemCssClass | BemElementWithModifier;

export const elementWithModifiers = <Type>(
  [element, modifiers]: BemElementWithModifier,
  props?: Type
): string => {
  if (typeof modifiers === "string") {
    const modifierClass = modifier(element, modifiers);
    return clsx(element, { [modifierClass]: props[modifiers] });
  }
  return clsx(
    element,
    modifiers.reduce((prev, curr) => {
      if (Array.isArray(curr)) {
        const [modifierProp, values] = curr;
        return clsx(
          values.reduce((p, c) => {
            const modifierClass = modifier(element, `${modifierProp}-${c}`);
            return [...p, clsx({ [modifierClass]: props[modifierProp] === c })];
          }, [])
        );
      }
    }, [])
  );
};

export const createModule = <Type extends Record<string, string | boolean>>(
  block: BemElement,
  elements?: BemElement | BemElement[]
) => (props?: Type) => {
  if (typeof elements === "undefined") {
    return {
      block: Array.isArray(block)
        ? elementWithModifiers<Type>(block, props || ({} as Type))
        : block,
    };
  }
  if (typeof elements === "string") {
    return {
      block: Array.isArray(block)
        ? elementWithModifiers<Type>(block, props)
        : block,
      [elements.includes("-") ? kebabToCamel(elements) : elements]: element(
        block,
        elements
      ),
    };
  }
  if (Array.isArray(elements)) {
    const bemElements = elements.reduce(
      (
        previous: Record<string, string>,
        current: BemElement | [string, BemModifier] | [string, BemModifier[]]
      ) => {
        if (typeof current === "string") {
          return {
            ...previous,
            [current.includes("-") ? kebabToCamel(current) : current]: element(
              block,
              current
            ),
          };
        }

        return previous;
      },
      {}
    );
    return {
      block: Array.isArray(block)
        ? elementWithModifiers<Type>(block, props)
        : block,
      ...bemElements,
    };
  }
};

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
