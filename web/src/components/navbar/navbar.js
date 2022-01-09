import { Button, Container, Nav, Navbar as RBNavbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useApp from "../../hooks/use-app";
import useLocalization from '../../hooks/use-localization';

const Navbar = ({ user = {} }) => {

  const appContext = useApp();
  const { language, setLanguage, locale } = useLocalization();

  const navigation = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    appContext.setIsAuthed(false);
    navigation('/login');
  }

  const navbarLocale = locale.components.navbar;

  return <RBNavbar className="bg-primary" fixed="top">
    <Container>
      <RBNavbar.Brand as={Link} to="/">eFood</RBNavbar.Brand>
      <Nav className="ml-auto">
        <Nav.Link as={NavLink} activeclassname="active" to="/">{navbarLocale.links.home}</Nav.Link>
        {appContext.isAuthed ? <NavDropdown
          title={appContext?.profile?.user?.email || appContext?.profile?.email || navbarLocale.links.settings}
          menuVariant="light"
          align="end"
        >
          <NavDropdown.Item as={NavLink} to="/profile">{navbarLocale.links.profile}</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logout}>{navbarLocale.links.logout}</NavDropdown.Item>
        </NavDropdown>
          : <Nav.Link as={NavLink} activeclassname="active" to="/login">{navbarLocale.links.login}</Nav.Link>
        }
        <NavDropdown
          title={language.toUpperCase()}
          menuVariant="light"
          align="end"
        >
          <NavDropdown.Item as={Button} onClick={() => setLanguage('al')} active={language === 'al'}>{navbarLocale.links.language.albanian}</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Button} onClick={() => setLanguage('en')} active={language === 'en'}>{navbarLocale.links.language.english}</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Container>
  </RBNavbar>
}

export default Navbar;
