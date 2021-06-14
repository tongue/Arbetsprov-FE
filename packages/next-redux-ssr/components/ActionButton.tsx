import React, { MouseEventHandler } from "react";
import { notUndefined } from "../utils";
import ActionForm from "./ActionForm";

interface Props {
  children: string | JSX.Element;
  actionType: string;
  values?: { [key: string]: string };
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ActionButton = ({
  actionType,
  values: _values,
  children,
  className,
  onClick,
}: Props): JSX.Element => {
  const values = notUndefined(_values) ? Object.entries(_values) : _values;

  const eventPreventDefault: MouseEventHandler<HTMLButtonElement> = (event) =>
    event.preventDefault();

  return (
    <ActionForm actionType={actionType}>
      {values &&
        values.map(([key, value]) => (
          <input
            key={`${key}-${value}`}
            type="hidden"
            name={key}
            value={value}
          />
        ))}
      <button
        type="submit"
        className={className}
        onClick={onClick ? onClick : eventPreventDefault}
      >
        {children}
      </button>
    </ActionForm>
  );
};

export default ActionButton;
