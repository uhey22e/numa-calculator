import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export type InputSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export function InputSection({ title, children }: InputSectionProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-row items-center gap-2 mb-2">
        <FontAwesomeIcon icon={faEdit} color="#1976d2" size="1x" />
        <h3>{title}</h3>
      </div>
      <>{children}</>
    </div>
  );
}
