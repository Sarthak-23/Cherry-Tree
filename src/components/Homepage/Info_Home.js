import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'

const Info_Home = () => {
    return (
        <Container className="mb-5">
            <Row>
                <Col md={6} sm={12} xs={12} className="center_elements">
                    <Image style={{width:"350px",height:"250px"}} src={process.env.PUBLIC_URL + 'images/menus.jpg'} thumbnail alt="browse_menus"></Image>
                    {/* https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/Explore_Restaurants.jpg?alt=media&token=0ab59e81-68a6-4f1d-9d51-9f2377cf4b83 */}
                </Col>
                <Col md={6} sm={12} xs={12} className="center_info_home info_home mt-md-0 mb-md-0 mt-sm-3 mb-sm-3 mt-3 mb-3" data-aos="fade-up">
                    <p>Look for <span className="info_color">restaurants</span> </p>
                    <p> that will deliver right to your door.</p>
                </Col>
            </Row>

            <Row>
                <Col md={6} sm={12} xs={12} className="center_elements">
                    <Image style={{width:"350px",height:"250px"}} src={process.env.PUBLIC_URL + 'images/explorerestaurants.jpg'} thumbnail alt="explore_restaurants"></Image>
                    {/* "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/Browse_Menus.jpg?alt=media&token=2d2a7c94-3517-4758-afb6-b8bd5bd44b9f" */}
                </Col>
                <Col md={6} sm={12} xs={12} className="center_info_home info_home mt-md-0 mb-md-0 mt-sm-3 mb-sm-3 mt-3 mb-3" data-aos="fade-up">
                    <p>In seconds, <span className="info_color">Browse</span></p>
                    <p> options and customise your order.</p> 
                </Col>
            </Row>
            
            <Row>
                <Col md={6} sm={12} xs={12} className="center_elements">
                    <Image style={{width:"350px",height:"250px"}} src={process.env.PUBLIC_URL + 'images/orderfood.jpg'} thumbnail alt="order_food"></Image>
                    {/* "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/Order_food.jpg?alt=media&token=41b600a5-8e22-4083-b42f-7ee1dbd642dc" */}
                </Col>
                <Col md={6} sm={12} xs={12} className="center_info_home info_home mt-md-0 mb-md-0 mt-sm-3 mb-sm-3 mt-3 mb-3" data-aos="fade-up">
                    <p>Food will be delivered right</p>
                    <p>to your <span className="info_color"> doorstep</span></p>
                </Col>
            </Row>
        </Container>
    )
}

export default Info_Home
