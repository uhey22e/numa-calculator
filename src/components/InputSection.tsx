import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

type InputSectionProps = {
  title: string;
};

export const InputSection: React.FC<InputSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="mb-2">
      <div className="flex flex-row items-center gap-2">
        <FontAwesomeIcon icon={faEdit} color="#1976d2" size="1x" />
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};
