import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Media, Image,Spinner } from 'react-bootstrap';
import { signUpUserStart } from '../redux/User/user.actions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAccountBox, MdEmail, MdLock } from "react-icons/md";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const Signup = props => {
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState)
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (currentUser) {
            reset();
            history.push('/');
            toast.success('Registration Successful',{
                position:'top-right'
            })
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

    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
        setErrors([]);
    };

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        if(!name||!email||!password||!cpassword)
        {
            toast.error('Please Fill all the fields',{
                position:'top-right'
            });
            return;
        }
        if(password !==cpassword) {
            toast.error('The password and confirmation password do not match.',{
                position:'top-right'
            });
            return;
        }
        setLoader(true);
        dispatch(signUpUserStart({
            name,
            email,
            password,
            cpassword
        }));
    }

    // const PostData = async (e) =>{
    //     e.preventDefault();
    //     console.log(typeof(user));
    //     const {name, username ,email, phone, address, password, cpassword} = user;

    //     const res =  await fetch("/signup", {
    //         method:"POST",
    //         headers: {
    //             "Content-Type" : "application/json"
    //         },
    //         body: JSON.stringify({
    //             name,
    //             username,
    //             email, 
    //             phone, 
    //             address, 
    //             password, 
    //             cpassword
    //         })
    //     });
    //     const data = await res.json();

    //     if(! (data.error))
    //     {
    //         window.alert("Registration Successfull");
    //         console.log(data);
    //         history.push('/login');
            
    //     }
    //     else
    //     {
    //         window.alert("Invalid Registration");
    //         console.log(data);
    //     }
    // }
    return (
        <>
            <Container className="p-5 mt-5">
                <Row xs="12" className="mt-5 shadow p-md-5 p-sm-3 mb-5 bg-white rounded justify-content-md-center">
                    <Col md="6" sm="12" xs="12" className="m-md-3">
                        <ToastContainer/>
                        <Col className="ml-4 mb-4 mt-3">
                            <h3>Sign Up</h3>
                        </Col>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdAccountBox style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" autoComplete="off"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdEmail style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                                </Col>
                                {/* <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text> */}
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdLock style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdLock style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} type="password" placeholder="Confirm Your Password" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"></Form.Label>
                                <Col  md="10" xs="10">
                                {loader?
                                        <Button disabled>
                                            <Spinner animation="grow" variant="dark" size="sm" />
                                            <Spinner animation="grow" variant="dark" size="sm" />
                                            <Spinner animation="grow" variant="dark" size="sm" />
                                        </Button>
                                    :
                                        <Button type="submit" onClick={handleFormSubmit}>Register</Button>
                                }
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md="3" className="m-auto">
                        <Row style={{alignItems:"center", justifyContent:"center"}}>
                            <Media>
                                <Image className="m-auto inner-img form-img" width={250} height={250} src={process.env.PUBLIC_URL + 'images/courier-rides-scooter.jpg'} alt="registration pic" rounded />
                                {/* "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/courier-rides-scooter.jpg?alt=media&token=89c30c72-cd30-42df-b793-8a2fdd4b32d6" */}
                            </Media>
                        </Row>
                        <Row style={{alignItems:"center", justifyContent:"center"}} className="mt-4 mb-4">
                            <NavLink to="/login" style={{textDecoration:"none", color:"black", fontWeight:"bold"}}>
                                    I am already register
                            </NavLink>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Signup;
