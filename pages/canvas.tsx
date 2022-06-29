import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";
import { WhiteboardSelector } from "../components/WhiteboardSelector/WhiteboardSelector";

const canvas: NextPage = () => {
  return (
    <Container fluid>
      <Row
        xs={10}
        md={3}
        className="py-10 px-[20rem]"
        suppressHydrationWarning={true}
      >
        <WhiteboardSelector></WhiteboardSelector>
      </Row>
    </Container>
  );
};

export default canvas;
