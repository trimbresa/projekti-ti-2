import {Col, Container, Nav, Navbar as RBNavbar, Row} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import './footer.css';

const Footer = () => {
  return <footer className="footer">
    <Container>
      <Row>
        <Col>
          <RBNavbar.Brand href="#home">eFood</RBNavbar.Brand>
        </Col>
        <Col>
          <Nav className="ml-auto">
            <Nav.Link as={NavLink} activeclassname="active" to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} activeclassname="active" to="/login">Login</Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  </footer>
}

export default Footer;
