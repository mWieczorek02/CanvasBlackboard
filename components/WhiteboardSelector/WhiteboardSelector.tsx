import { Container, Col } from "react-bootstrap";
import styles from "./style.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";

export const WhiteboardSelector = () => {
  const router = useRouter();

  return (
    <Col
      className={styles.wbselector}
      onClick={() => router.push("/canvas/create")}
    >
      <BsFillPlusCircleFill className={styles.icon} />
      <span className={styles.newWhite}>New Canvas</span>
    </Col>
  );
};
