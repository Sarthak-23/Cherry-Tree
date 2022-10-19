import React, { useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addfeedbackStart } from '../../redux/FeedBack/feebacks.actions';
import { useHistory, useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const mapState = ({user}) => ({
    currentUser: user.currentUser
});

const Ratings = () => {
    const {currentUser} = useSelector(mapState);
    const location = useLocation();
    const history = useHistory();
    const [rating,setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedBack, setFeedback] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!rating || !feedBack)
        {
            toast.error('Please Fill all the fields',{
                position:'top-right'
            });
            return;
        }
        dispatch(
            addfeedbackStart({
                rating,
                feedBack,
                restaurantuid:location.state.restaurantuid,
                name:currentUser.name
            })
        )
        history.push('/ordershistory');
    };

    return (
        <Container className="p-5">
            <Row xs="12" className=" mt-5 shadow p-5 mb-5 bg-white rounded justify-content-xs-center">
                <Col md="12" sm="12" xs="12" className="m-md-3">
                    <ToastContainer/>
                        <div className="ml-2 mb-4 feedback">
                            <h3>Give Your Feedback</h3>
                        </div>
                    <Form>
                        <Form.Group className="text-center">
                            {[...Array(5)].map((star,index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="rating" 
                                            value={ratingValue} 
                                            onClick={()=> setRating(ratingValue)}
                                        />
                                        <FaStar 
                                            style={{cursor:"pointer", textAlign:"center", fontSize:"5vw"}} 
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                            // size={100} 
                                            onMouseEnter={()=> setHover(ratingValue)}
                                            onMouseLeave={()=> setHover(null)} 
                                        />
                                    </label>
                                )
                            })}
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Control as="textarea" rows={7} placeholder="Your Feedback" value={feedBack} onChange={(e)=> setFeedback(e.target.value)} />
                        </Form.Group>
                    </Form>
                <Button variant="outline-success" type="submit" onClick={handleSubmit} >Submit!!</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Ratings
