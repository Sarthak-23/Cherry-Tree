import React from 'react'
import {Image, Jumbotron} from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';
import {useLocation, Link} from 'react-router-dom';

// import hotchips from '../images/hotchips.jpeg';

const Jumbo = props => {
    const location = useLocation();
    // console.log(location.state.details);
    const {address, charge, duration, name, type,star,people, url,documentID} = location.state.details;
    const resname = name.replace(/ /g, "");

    return (
        <Jumbotron fluid className="jumbo">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col md={4} className="mt-md-4 mt-sm-3 mt-5 text-center">
                        <Image src={url} alt="Restaurant Pic" style={{width:"200px",height:"200px"}} className="box" thumbnail/>
                    </Col>      
                    <Col md={8} className="mt-md-4 mt-sm-3 mt-5">
                        <div className="p-2 brand_name" style={{fontSize:"30px"}}>{name}</div>
                        <div className="p-2">{type}</div>
                        <div className="p-2">{address}</div>
                        <div style={{display:"flex"}}>
                            <div className="p-2">
                                <Link to={{
                                    pathname:`/feedback/${resname}`,
                                    state: {ID:documentID}
                                }}
                                style={{color:"white"}}
                                >⭐{(star===0)?'0':Math.round((star/people)*10)/10}
                                </Link>
                            </div>
                            <div className="p-2"> {duration} </div>
                            <div className="p-2"> ₹ {charge} </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}

export default Jumbo
