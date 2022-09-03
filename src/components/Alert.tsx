import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "tailwindcss/colors";
import classNames from "classnames";
import React from "react";
import {
  faExclamationTriangle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

export type AlertProps = {
  severity: "error" | "warning";
  children?: React.ReactNode;
};

export function Alert({ severity, children }: AlertProps) {
  const icon = {
    error: faExclamationCircle,
    warning: faExclamationTriangle,
  }[severity];
  const bgColorClass = {
    error: "bg-rose-50",
    warning: "bg-amber-50",
  }[severity];
  const iconColor = {
    error: colors.rose[500],
    warning: colors.amber[500],
  }[severity];
  return (
    <div
      className={classNames(
        "p-3 flex flex-row gap-2 items-center text-sm rounded-md",
        bgColorClass
      )}
    >
      <FontAwesomeIcon icon={icon} color={iconColor} size="lg" />
      <div>{children}</div>
    </div>
  );
}
