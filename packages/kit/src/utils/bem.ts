import clsx from "clsx";

export const createModifierClass = (
  blockOrElement: Element,
  modifier: Element
): string => `${blockOrElement}--${modifier}`;

export const createElementClass = (
  block: BemElement,
  element: BemElement
): string => `${block}__${element}`;

type Element = string;
type ModifierParameter = string;
type ModifierValue = string;
type Modifier = ModifierParameter | [ModifierParameter, ModifierValue[]];
type BemElement = Element | [Element, Modifier | Modifier[]];

export const createModule = <Type extends Record<string, string | boolean>>(
  block: BemElement,
  elements?: BemElement | BemElement[]
) => (props?: Type) => {
  if (typeof elements === "undefined") {
    return {
      block,
    };
  }
};
