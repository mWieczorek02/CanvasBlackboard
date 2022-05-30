import {
  Alert,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  SSRProvider,
} from "react-bootstrap";

export const PageNavbar = () => {
  return (
    <SSRProvider>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Canvas Blackboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/canvas">Blackboard</Nav.Link>
              <Nav.Link href="/link">FTP browser</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </SSRProvider>
  );
};
