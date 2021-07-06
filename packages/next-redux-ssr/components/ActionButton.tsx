import React, { MouseEventHandler } from "react";
import { ButtonHTMLAttributes } from "react";
import { notUndefined } from "../utils";
import ActionForm from "./ActionForm";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  ...props
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
        {...props}
      >
        {children}
      </button>
    </ActionForm>
  );
};

export default ActionButton;
