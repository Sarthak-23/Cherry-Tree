import React , {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import { signOutUserStart } from '../../redux/User/user.actions'
import { Container, NavDropdown} from 'react-bootstrap';
import {NavLink, useHistory} from 'react-router-dom';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Navbar1 = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const signOut = () => {
        dispatch(signOutUserStart());
        // history.push('/adminlogin');
    };

    useEffect(() => {
        if (!currentUser) {
            history.push('/adminlogin');
        }
    }, [currentUser]);

    return (
        <Navbar fluid collapseOnSelect expand="sm" variant="light" className="nav1" fixed="top">
            <Container>
                <NavLink className="nav-link brand_name" to="/" style={{fontSize:"larger", color:"black"}}>Cherry Tree</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        <NavLink className="nav-link" to="/orders">Orders</NavLink>
                        <span className="nav-link" style={{cursor:"pointer"}} onClick={()=> signOut()}>Logout</span>
                        
                    {/* <span className="nav-link" style={{cursor:"pointer"}} onClick={()=> signOut()}>Logout</span> */}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Navbar1;
