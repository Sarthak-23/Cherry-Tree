import React , {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
    // resetPasswordError: user.resetPasswordError
});

const Recovery = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email,setEmail] = useState('');
    const [errors,setErrors] = useState([]);

    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }
        if(errors) {
            errors.map((err,idx)=> {                
                return(
                    toast.error(err,{
                        position:'top-right'
                    })
                )
            });
        }
    }, [userErr]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!email)
        {
            toast.error('Please Enter Email',{
                position:'top-right'
            })
            return;
        }
        dispatch(resetPasswordStart({ email }));
    }
    
    return (
        <>
            <Container className="p-5">
                <Row xs="12" className=" mt-5 shadow p-5 mb-5 bg-white rounded justify-content-xs-center">
                    <Col md="6" sm="12" xs="12" className="m-md-3">
                        <ToastContainer/>
                        <Col className="ml-4 mb-4">
                            <h3>Recover Account</h3>
                        </Col>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><i className="zmdi zmdi-email material-icons-name"></i></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col xs={{ span: 10, offset: 1 }}>
                                    <Button type="submit" onClick={handleSubmit}>Send Email</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Recovery
