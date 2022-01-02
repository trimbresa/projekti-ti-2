import { Button, Container, Nav, Navbar as RBNavbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useApp from "../../hooks/use-app";
import useLocalization from '../../hooks/use-localization';

const Navbar = ({ user = {} }) => {

  const appContext = useApp();
  const { language, setLanguage } = useLocalization();

  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    appContext.setIsAuthed(false);
    navigation('/login');
  }

  return <RBNavbar className="bg-primary" fixed="top">
    <Container>
      <RBNavbar.Brand as={Link} to="/">eFood</RBNavbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={NavLink} activeclassname="active" to="/">Home</Nav.Link>
        {appContext.isAuthed ? <NavDropdown
          title={appContext?.profile?.user?.email || 'Settings'}
          menuVariant="light"
          align="end"
        >
          <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
        </NavDropdown>
          : <Nav.Link as={NavLink} activeclassname="active" to="/login">Login</Nav.Link>
        }
        <NavDropdown
          title={language.toUpperCase()}
          menuVariant="light"
          align="end"
        >
          <NavDropdown.Item as={Button} onClick={() => setLanguage('al')} active={language === 'al'}>Albanian</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Button} onClick={() => setLanguage('en')} active={language === 'en'}>English</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Container>
  </RBNavbar>
}

export default Navbar;
