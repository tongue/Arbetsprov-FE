import React, { FormEventHandler, ReactNode } from "react";
import { HTMLProps } from "react";

export interface Props extends HTMLProps<HTMLFormElement> {
  actionType: string;
  children: ReactNode;
}

const ActionForm = ({ actionType, children, ...props }: Props): JSX.Element => {
  const onSubmit: FormEventHandler = (event) => event.preventDefault();

  return (
    <form {...props} method="GET" action="/" onSubmit={onSubmit}>
      <input type="hidden" name="actionType" value={actionType} />
      {children}
    </form>
  );
};

export default ActionForm;
