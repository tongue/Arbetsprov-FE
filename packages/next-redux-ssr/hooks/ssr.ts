import { useRouter } from "next/router";

export function useServerSideAction(
  actionType: string,
  queryParameters: undefined
): [boolean];
export function useServerSideAction(
  actionType: string,
  queryParameters: string[]
): [boolean, string[]];
export function useServerSideAction(
  actionType: string,
  queryParametersOrUndefined: string[] | undefined
): [boolean, string[]] | [boolean] {
  const router = useRouter();

  const isActionType = actionType === router.query.actionType;

  const queryArgumentValues: string[] | undefined = queryParametersOrUndefined
    ? queryParametersOrUndefined.flatMap((arg) => router.query[arg])
    : undefined;

  return queryParametersOrUndefined
    ? [isActionType, queryArgumentValues]
    : [isActionType];
}
