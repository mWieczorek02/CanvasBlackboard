import { Container, Col, Modal } from "react-bootstrap";
import styles from "./style.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { BoardsType } from "../../interfaces";
import { ModalComponent } from "./Modal";
import BoardIcon from "./boardIcon";

export const WhiteboardSelector = () => {
  const router = useRouter();

  const { value, setValue } = useLocalStorage<BoardsType>("boards", {});

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col
        className={styles.wbselector}
        onClick={() => {
          handleShow();
        }}
      >
        <BsFillPlusCircleFill className={styles.icon} />
        <span className={styles.newWhite}>New Canvas</span>
      </Col>
      {Object.keys(value).map((e, i) => {
        return <BoardIcon name={e} key={e + i} />;
      })}
      <ModalComponent
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      ></ModalComponent>
    </>
  );
};
