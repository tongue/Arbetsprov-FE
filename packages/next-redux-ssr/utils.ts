import { AppState } from "./store";

export const isServer = typeof window === "undefined";

// Typeguard for undefined elements
export const notUndefined = <Type>(x: Type | undefined): x is Type =>
  x !== undefined;

// Typeguard for string
export const isString = (x: unknown): x is string => typeof x === "string";

export const logServerState = (state: AppState, id: string): void => {
  console.log(`-- state@${id}`);
  console.dir(state);
};

export const hasLength = (x: string | unknown[] | undefined | null): boolean =>
  x ? x.length > 0 : false;
