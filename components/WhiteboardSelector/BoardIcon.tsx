import { useRouter } from "next/router";
import React from "react";
import { Col } from "react-bootstrap";
import styles from "./style.module.css";
import { BsFillPencilFill } from "react-icons/bs";

const BoardIcon: React.FC<{ name: string }> = ({ name }) => {
  const router = useRouter();
  return (
    <Col
      suppressHydrationWarning={true}
      className={styles.wbselector}
      onClick={() => router.push(`/canvas/${name}`)}
    >
      <BsFillPencilFill className={styles.icon} />
      <span suppressHydrationWarning={true} className={styles.newWhite}>
        {name}
      </span>
    </Col>
  );
};

export default BoardIcon;
