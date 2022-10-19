import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Card, CardDeck, Col, Container, Row} from 'react-bootstrap';
// import List from '../Restaurants/Restaurant_List';
import {Link} from 'react-router-dom';
import { fetchRestaurantsStart } from '../../redux/Restaurants/restaurants.actions';

const mapState = ({ restaurantsData }) => ({
    restaurants: restaurantsData.restaurants
});

const Cards = props => {
    const dispatch = useDispatch();
    const { restaurants } = useSelector(mapState);
    // console.log(restaurants);


    useEffect(() => {
        dispatch(
            fetchRestaurantsStart()
        );
    }, []);

    return (
        <Container className="mt-5 mb-5">
            <Row className="centered_row">
                <CardDeck>
                    {restaurants.map((restaurant,index) => {
                        const {
                            charge,
                            duration,
                            type,
                            name,
                            url,
                            star,
                            people,
                            documentID
                        } = restaurant;
                        const resname = name.replace(/ /g, "");
                        return (
                            <Col className="center_elements mt-3" data-aos="fade-up">
                                <Card style={{ width: '18rem' }} className="card1" key={name}>
                                    <Card.Img variant="top" src={url} alt="image" />
                                    <Card.Body>
                                        <Card.Title className="card_title">{name}</Card.Title>
                                        <br></br>
                                        <Card.Text>
                                            <p>{type}</p>
                                        </Card.Text>
                                        <br></br>
                                        <Card.Text className="card_content">
                                            <Link to={{
                                                pathname:`/feedback/${resname}`,
                                                state: {ID:documentID}
                                            }}
                                            style={{color:"black"}}
                                            >⭐{(star===0)?'0':Math.round((star/people)*10)/10}
                                            </Link>
                                            <p>{duration}</p>
                                            <p>₹{charge}</p>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer style={{textAlign:'center'}}>
                                        <Card.Link>
                                            <Link className="nav-link" to={{
                                                pathname:`/restaurant/${resname}`,
                                                state: {ID:documentID, details:restaurant}
                                            }}
                                            //  to={`/restaurant/${documentID}`}
                                            >Know More</Link>
                                        </Card.Link>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })}
                </CardDeck>
            </Row>
        </Container>
    )
}

export default Cards
