import { Container, Nav, Navbar as RBNavbar } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return <RBNavbar className="bg-primary" fixed="top">
    <Container>
      <RBNavbar.Brand href="#home">eFood</RBNavbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={NavLink} activeclassname="active" to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} activeclassname="active" to="/login">Login</Nav.Link>
      </Nav>
    </Container>
  </RBNavbar>
}

export default Navbar;
