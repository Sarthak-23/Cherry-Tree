import React from 'react'
import {Jumbotron} from 'react-bootstrap';
import { Col, Container, Row } from 'react-bootstrap';

const Jumbotron_home = props => {
    return (
        <Jumbotron fluid className="jumbo">
            <Container>
                <Row>
                    <Col className="mt-5 mt-sm-3">
                        <br />
                        <h1 className="brand_name">Cherry Tree</h1>
                        <br/>
                        <p style={{fontFamily:"'Signika', sans-serif "}}>
                            We take inspiration from the World's best cuisines, and create a unique fusion experience.<br/>
                            Our lipsmacking creations will tickle your culinary senses!
                        </p>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}

export default Jumbotron_home
