import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Media, Image,Spinner } from 'react-bootstrap';
import {emailSignInStart, googleSignInStart} from '../redux/User/user.actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdEmail, MdLock } from "react-icons/md";

const mapState = ({user}) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const Signin = props => {
    const { currentUser, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    // const {state,dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            toast.error('Logged In Successful !!',{
                position:'top-right'
            })
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length>0) {
            setErrors(userErr);
            setLoader(false);
        }
    }, [userErr]);

    useEffect(() => {
        errors.length>0 && (
            errors.map((err,index)=> {
                return(
                    toast.error(err, {
                        position: "top-right",
                    })
                )
            })
        )
    }, [errors])

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors([]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if(!email||!password)
        {
            toast.error('Please Fill all the fields',{
                position:'top-right'
            });
            return;
        }
        setLoader(true);
        dispatch(emailSignInStart({email, password}));
    }

    const handleGoogleSignIn = () => {
        dispatch(googleSignInStart());
    };
    // const loginUser = async (e) => {
    //     e.preventDefault();

    //     const res = await fetch('/signin', {
    //         method:"POST",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body:JSON.stringify({
    //             email,
    //             password
    //         })

    //     });

    //     const data = await res.json();
    //     console.log(data);

    //     if((data.message === "User Signin Successfully !!"))
    //     {
    //         dispatch({type:'USER', payload:true})
    //         window.alert('Login Successful!!');
    //         // console.log(data);
    //         history.push('/');
    //     }
    //     else{
    //         window.alert('Invalid Credentials');
    //     }
    // }

    return (
        <>
        <Container className="p-5 mt-5">
                <Row xs="12" className="mt-5 shadow p-md-5 p-sm-3 mb-5 bg-white rounded justify-content-md-center">
                    <Col md="3" className="m-auto">
                        <ToastContainer/>
                        <Row style={{alignItems:"center", justifyContent:"center"}}>
                            <Media>
                                <Image className="mt-sm-0 m-auto inner-img form-img" width={300} height={250} src={process.env.PUBLIC_URL + 'images/Signup.jpg'} alt="Signin pic" rounded />
                                {/* "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/Signup.jpg?alt=media&token=1c4aaaa8-ad66-41d3-b569-53ff45faf100" */}
                            </Media>
                        </Row>
                        <Row style={{alignItems:"center", justifyContent:"center"}} className="mt-4 mb-4">
                            <NavLink to="/signup" style={{textDecoration:"none", color:"black", fontWeight:"bold"}}>
                                Create an Account!!
                            </NavLink>
                        </Row>
                    </Col>
                    <Col md="6" sm="12" xs="12" className="m-md-3 m-sm-0 m-xs-0">
                        <Col className="mb-4">
                            <h3>Log In</h3>
                        </Col>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdEmail style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdLock style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"></Form.Label>
                                <Col md="10" xs="10">
                                {loader?
                                        <Button disabled>
                                            <Spinner animation="grow" variant="dark" size="sm" />
                                            <Spinner animation="grow" variant="dark" size="sm" />
                                            <Spinner animation="grow" variant="dark" size="sm" />
                                        </Button>
                                    :
                                        <Button type="submit" className="btn btn-sm" onClick={handleSubmit}>Log In</Button>
                                }
                                </Col>
                            </Form.Group>
                        </Form>
                            
                        <Form.Group as={Row}>
                            <Form.Label column md="1" xs="1"></Form.Label>
                            <Col md="10" xs="10" xl={{offset:3}}>
                                <Button variant="dark" className="btn btn-sm" onClick={handleGoogleSignIn}>Sign in with Google</Button>
                            </Col>
                        </Form.Group>
                            
                        <Form.Group as={Row}>
                            <Form.Label column md="1" xs="1"></Form.Label>
                            <Col md="10" xs="10" xl={{offset:3}}>
                                <NavLink to="/recovery">Reset Password</NavLink>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Signin;
