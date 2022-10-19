import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions'
import { Container, NavDropdown,Navbar, Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'
import { checkUserIsAdmin } from './../../Utils';
import { FaShoppingCart } from "react-icons/fa";

const mapState = (state) => ({
    currentUser: state.user.currentUser,
    totalNumCartItems: selectCartItemsCount(state)
});

const Navbar1 = props => {
    const dispatch = useDispatch();
    const { currentUser, totalNumCartItems } = useSelector(mapState);

    const isAdmin = checkUserIsAdmin(currentUser);


    // console.log(currentUser);
    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <Navbar collapseOnSelect expand="sm" variant="light" className="nav1" fixed="top">
            <Container>
                <NavLink className="nav-link brand_name" to="/" style={{fontSize:"larger", color:"black"}}>Cherry Tree</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                {currentUser ?
                    <>
                        <NavLink className="nav-link" style={{cursor:"pointer"}} to="/cart"><FaShoppingCart /> ({totalNumCartItems}) </NavLink>
                        
                        {isAdmin? 
                            <NavLink className="nav-link" style={{cursor:"pointer"}} to="/dashboard">Dashboard</NavLink>
                            :null
                        }
                        <NavLink className="nav-link" style={{cursor:"pointer"}} to="/ordershistory">Orders History</NavLink>
                        <span className="nav-link" style={{cursor:"pointer"}} onClick={()=> signOut()}>Logout</span>

                    </>
                    :
                    <>
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-link" to="/signup">Signup</NavLink>
                        <NavDropdown
                                id="nav-dropdown-light"
                                title="Partner with us"
                                // menuVariant="light"
                        >
                            <NavDropdown.Item>
                                <NavLink className="nav-link" exact to="/adminlogin">Admin Login</NavLink>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <NavLink className="nav-link" exact to="/adminsignup">Admin SignUp</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Navbar1;
