import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

type OutputSectionProps = {
  title: string;
};

export const OutputSection: React.FC<OutputSectionProps> = ({
  title,
  children,
}) => (
    <div className="mb-4">
      <div className="flex flex-row gap-2 items-center mb-2">
        <FontAwesomeIcon icon={faCheckSquare} color="#1976d2" size="1x" />
        <h4>{title}</h4>
      </div>
      {children}
    </div>
  );
