import React, { Dispatch, SetStateAction, useState } from "react";
import { ButtonGroup, Button, Overlay } from "react-bootstrap";
import styles from "./toolbar.module.css";
import { BsEraser, BsPencil } from "react-icons/bs";
import ToolbarButton from "./ToolbarButton";

type ToolbarType = {
  setTool: Dispatch<SetStateAction<string>>;
  strokeWidth: number;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
  strokeColor: string;
  setStrokeColor: Dispatch<SetStateAction<string>>;
};

export const Toolbar: React.FC<ToolbarType> = ({
  setTool,
  strokeWidth,
  setStrokeWidth,
  strokeColor,
  setStrokeColor,
}) => {
  const [selected, setSelected] = useState<string>("pen");

  return (
    <ButtonGroup size="lg" className={`${styles.toolbar} mb-2`}>
      <ToolbarButton
        title="pen"
        icon={<BsPencil />}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        setTool={setTool}
      />
      <ToolbarButton
        title="eraser"
        icon={<BsEraser />}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        setTool={setTool}
      />
    </ButtonGroup>
  );
};
