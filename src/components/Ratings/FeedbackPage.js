import React,{ useEffect } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedbackStart, setFeedbacks } from '../../redux/FeedBack/feebacks.actions'
import { FaStar } from "react-icons/fa";

const mapState = ({ feedbacksData }) => ({
    feedbacks: feedbacksData.feedbacks,
});

const FeedbackPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { feedbacks } = useSelector(mapState);
    // console.log(location.state.ID);
    // console.log(feedbacks);
    // const id = location?location.state.ID:"id"

    useEffect(()=> {
        dispatch(
            fetchFeedbackStart(location.state.ID)
        );

        return () => {
            dispatch(
                setFeedbacks([])
            )
        }
    }, []);

    return (
        <Container className="p-5 mt-5">
                <ListGroup>
                    {feedbacks.length>0? feedbacks.map((feed,index)=> {
                        return (
                            <ListGroup.Item variant="dark" key={index} className="font mt-3">
                            <h5>{feed.name}</h5>
                            {[...Array(feed.rating)].map((star,idx) => {
                                const ratingValue = idx + 1;
                                return (
                                    <FaStar 
                                        style={{cursor:"pointer", textAlign:"center", fontSize:"1.5rem"}} 
                                        color={ratingValue <= feed.rating ? "#ffc107" : "#ffffff"} 
                                        className="mb-3"
                                        key={idx}
                                    />
                                )
                            })}
                            <p> {feed.feedBack} </p>
                            </ListGroup.Item>
                        )
                    })
                    : "There is currently no feedback for the restaurant!!"}

                </ListGroup>
        </Container>
    )
}

export default FeedbackPage
