import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from '../../redux/User/user.actions'
import { useHistory } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

const mapState = (state) => ({
    currentUser: state.user.currentUser,
});

const Footer = props => {
    const { currentUser } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return (
        <Container fluid className="footer">
        <br />
            <Row>
                <Col md={{span:3,offset:1}} xs={5}>
                        <h5><b>Links</b></h5>
                        <div className="footer_content">
                            <ul className="list-unstyled text-decoration-none">
                            {currentUser?
                            <>
                                <li style={{cursor:"pointer"}} onClick={()=> signOut()}>Logout</li>
                            </>
                            :
                            <>
                                <li style={{cursor:"pointer"}} onClick={()=> history.push('/login')}>Login</li>
                                <li style={{cursor:"pointer"}} onClick={()=> history.push("/signup")}>Signup</li>
                                <li style={{cursor:"pointer"}} onClick={()=> history.push("/adminlogin")}>Partner with us</li>
                            </>
                            }
                            </ul>
                        </div>
                </Col>
                <Col md={{span:3,offset:1}} xs={7}>
                    <h5><b>Our Address</b></h5>
                    <address className="footer_content">
                        Indian Institute of <br/>
                        Information Technology,<br />
                        Gwalior[M.P]<br />
                    </address>
                </Col>
                <Col md={{span:3,offset:1}} sm={12}>
                    <div className="phone_text_center">
                        <h5><b>Phone Number</b></h5>
                        <div className="footer_content">
                            1234567890
                        </div>
                    </div>
                </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
                <p>© Copyright 2021 Cherry Tree</p>
            </Row>
        </Container>
    )
}

export default Footer
