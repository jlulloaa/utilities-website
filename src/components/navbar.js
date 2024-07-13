import {Container, Nav, Navbar} from 'react-bootstrap';
// In order to style the navigation bar, is better to use NavLink instead of Link (see https://v5.reactrouter.com/web/api/NavLink). But, in order to make the navbar truly collapsable, had to stick with Link (see last comment below)
import { Link } from 'react-router-dom';


function NavBar() {
    return (
        <Navbar collapseOnSelect bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand data-tip data-for="homeTip" href="/" onClick={() => window.location.reload()}> 
                    <img src="./isandex_icon.png" height="32px" alt="iSANDEx Logo"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="pills" className="ms-auto" defaultActiveKey="/" >
                        <Nav.Link data-tip data-for="wipTip" className="nav-link" to="/dashboard" as={Link} href="/dashboard" > Dashboard</Nav.Link>
                        <Nav.Link data-tip data-for="wipTip" className="nav-link" to="/admin" as={Link} href="/admin" > Manage Utilities</Nav.Link>
                        <Nav.Link data-tip data-for="aboutTip" className="nav-link" to="/about" as={Link} href="/about" > About </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
