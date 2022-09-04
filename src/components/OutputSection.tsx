import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export type OutputSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export function OutputSection({ title, children }: OutputSectionProps) {
  return (
    <div className="mb-4">
      <div className="flex flex-row gap-2 items-center mb-2">
        <FontAwesomeIcon icon={faCheckSquare} color="#1976d2" size="1x" />
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
}
