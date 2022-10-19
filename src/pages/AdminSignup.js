import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Media, Image, Spinner } from 'react-bootstrap';
import { signUpAdminStart } from '../redux/User/user.actions'
import ProgressB from '../components/Homepage/ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAccountBox, MdEmail, MdLock, MdRestaurant, MdPhoneInTalk } from "react-icons/md";
import { FaAddressBook, FaClock, FaMoneyBillAlt, FaFileImage } from "react-icons/fa";

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const AdminSignup = props => {
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState)
    const dispatch = useDispatch();
    const [name,setName] = useState('');
    const [type,setType] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');
    const [duration,setDuration] = useState('');
    const [charge,setCharge] = useState('');
    const [file,setFile] = useState(null);
    const [url, setUrl] = useState(null);
    const [errors, setErrors] = useState([]);
    const [loader, setLoader] = useState(false);

    const types = ['image/png', 'image/jpeg'];

    useEffect(() => {
        if (currentUser) {
            reset();
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
    // useEffect(()=> {
    //     setUrl()
    // },[file])

    const reset = () => {
        setName('');
        setType('');
        setEmail('');
        setPhone('');
        setAddress('');
        setPassword('');
        setCpassword('');
        setDuration('');
        setCharge('');
        setErrors([]);
        setFile(null);
      };

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        // console.log(url);
        if(!name || !email || !type || !phone || !address || !duration || !charge || !url || !password || !cpassword)
        {
            toast.error('Please Fill all the fields',{
                position:'top-right'
            });
            return;
        }
        if(phone.length>10 || phone.length<10)
        {
            toast.error('Please enter valid phone number',{
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
        dispatch(signUpAdminStart({
            name,
            type,
            email,
            phone,
            address,
            password,
            cpassword,
            duration,
            charge,
            url
        }));
    }

    const changehandler = (e) => {
        let selected = e.target.files[0];
        // console.log(selected);
        // console.log(types.includes(selected.type));
        // console.log(selected && types.includes(selected.type));
        if(selected && types.includes(selected.type)) {
            setFile(selected);
            setErrors([]);
        } 
        else{
            setFile(null);
            const Err = ['Please Select an image file (png or jpeg)'];
            setErrors(Err);
        }
    }

    return (
        <>
            <Container className="p-5 ">
                <Row xs="12" className="mt-5 shadow p-md-5  mb-5 bg-white rounded justify-content-md-center">
                    <Col xl="6" md="9" sm="12" xs="12" className="m-md-3">
                        <ToastContainer/>
                        <Col className="ml-4 mb-4 mt-4">
                            <h3>Sign Up</h3>
                        </Col>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><MdAccountBox style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Restaurant Name" autoComplete="off"  />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"> <MdRestaurant style={{fontSize:"20px"}}/> </Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="type" value={type} onChange={(e) => setType(e.target.value)} type="text" placeholder="Restaurant Category" autoComplete="off"  />
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
                                <Form.Label column md="1" xs="1"><MdPhoneInTalk style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Your Phone" autoComplete="off"  />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaAddressBook style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="address" value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Your Address" autoComplete="off"  />
                                </Col>
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
                                <Form.Label column md="1" xs="1"><FaClock style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} type="text" placeholder="Maximum Duration to deliver food" />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaMoneyBillAlt style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="charge" value={charge} onChange={(e) => setCharge(e.target.value)} type="text" placeholder="Minimum Charges. Eg. ₹300 for two" />
                                </Col>
                            </Form.Group>
                            { file && 
                                <Form.Group as={Row}>
                                    <Form.Label column md="1" xs="1"></Form.Label>
                                    <Col md="10" xs="10">
                                        <ProgressB file={file} setFile={setFile} setUrl={setUrl}/>
                                    </Col>
                                </Form.Group>
                            }
                            
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaFileImage style={{fontSize:"20px"}}/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.File onChange={changehandler} />
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
                                        <Button type="submit" onClick={handleFormSubmit}>Register</Button>
                                    }
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xl="3" md="6" className=" m-auto">
                        <Row style={{alignItems:"center", justifyContent:"center"}}>
                            <Media >
                                <Image className="m-auto inner-img form-img" width={400} height={250} src={process.env.PUBLIC_URL + 'images/adminsignup.jpg'} alt="registration pic" rounded />
                                {/* "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/adminsignup.jpg?alt=media&token=672edecc-92e1-49dc-87ec-8a05e15ac568" */}
                            </Media>
                        </Row>
                        <Row style={{alignItems:"center", justifyContent:"center"}} className="mt-4 mb-4">
                            <NavLink to="/adminlogin" style={{textDecoration:"none", color:"black", fontWeight:"bold"}}>
                                    I am already register
                            </NavLink>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AdminSignup;
