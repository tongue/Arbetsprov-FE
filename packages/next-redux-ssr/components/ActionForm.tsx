import React, { FormEventHandler, ReactNode } from "react";

export interface Props {
  actionType: string;
  children: ReactNode;
}

const ActionForm = ({ actionType, children }: Props): JSX.Element => {
  const onSubmit: FormEventHandler = (event) => event.preventDefault();

  return (
    <form method="GET" action="/" onSubmit={onSubmit}>
      <input type="hidden" name="actionType" value={actionType} />
      {children}
    </form>
  );
};

export default ActionForm;
