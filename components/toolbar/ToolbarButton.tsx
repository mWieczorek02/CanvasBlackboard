import { Button, Overlay, Popover, Form } from "react-bootstrap";
import React, {
  Component,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  ReactNode,
  BaseSyntheticEvent,
} from "react";
import styles from "./toolbar.module.css";

type ToolbarButtonType = {
  icon: ReactNode;
  setTool: Dispatch<SetStateAction<string>>;
  title: string;
  strokeWidth: number;
  setStrokeWidth: Dispatch<SetStateAction<number>>;
};

const ToolbarButton: React.FC<ToolbarButtonType> = ({
  icon,
  setTool,
  title,
  strokeWidth,
  setStrokeWidth,
}) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = () => {
    setShow(!show);
    setTarget(ref.current);
  };

  return (
    <>
      <Button
        className={styles.btn}
        ref={ref}
        onBlur={(event: React.FocusEvent) => {
          event.relatedTarget || setShow(false);
        }}
        value={title}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setTool(e.currentTarget.value);
          handleClick();
        }}
      >
        {icon}
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
        rootCloseEvent="mousedown"
      >
        <Popover id="popover-contained">
          <Popover.Body className="w-40">
            <Form.Label>Stroke Width</Form.Label>
            <Form.Range
              onBlur={() => setShow(false)}
              onChange={(e) => {
                setStrokeWidth(+e.target.value);
              }}
              value={strokeWidth}
            />
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default ToolbarButton;
