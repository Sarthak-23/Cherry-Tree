import React, { useEffect } from 'react'
import { Col, Container, Row, Table, Image,Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import { getAdminOrderDetailsStart, setAdminOrderDetails} from '../../redux/Orders/orders.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars-2';


const mapState = ({ ordersData }) => ({
    orderDetails: ordersData.orderAdminDetails
});

const OrdersDetails = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal, name, address, phone } = orderDetails;
    const orderItems = orderDetails && orderDetails.orderItems;

    useEffect(()=>{
        dispatch(
            getAdminOrderDetailsStart(orderID)
        );
        return () => {
            dispatch(
                setAdminOrderDetails({})
            );
        }
    }, []);

    return (
        <Container className="p-5">
            <Row xs="12" className="mt-5 shadow p-5 mb-5 bg-white rounded justify-content-center">
                <Col md="12" sm="12" xs="12">
                    <Col className="mb-4 info_order text-center">
                            <p>Order Id #{orderID?orderID:""}</p>
                    </Col>
                    <Row className="mt-5">
                        <Col className="d-flex info_order1 justify-content-between">
                            <p className="mr-5"> <span style={{fontWeight:"600", fontFamily:"Raleway"}}>Name:</span> { name }</p>
                            <p className="mr-5 float-right"> <span style={{fontWeight:"600" , fontFamily:"Raleway"}}>Address:</span> { address }</p>
                        </Col>
                    </Row>
                    <Row className="mb-5">
                        <Col className="d-flex info_order1 justify-content-between">
                            <p className="mr-5"> <span style={{fontWeight:"600" , fontFamily:"Raleway"}}>Phone:</span> { phone }</p>
                            <p className="mr-5 float-right"><span style={{fontWeight:"600" , fontFamily:"Raleway"}}> Total Amount:</span> ₹{ orderTotal }</p>
                        </Col>
                    </Row>
                    {orderItems?
                    <Scrollbars  style={{ height: 425 }}>
                        <Table responsive="sm" className="text-center">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                                    {(Array.isArray(orderItems) && orderItems.length> 0) && orderItems.map((items,key)=> {
                                        return (
                                            <tr key={key}>
                                                <td className="col-sm-12 col-md-3"><Image src={items.url} alt={items.name} thumbnail className="tableImage"/></td>
                                                <td className="col-sm-12 col-md-3" md="3" xs="12">{items.name}</td>
                                                <td className="col-sm-12 col-md-3" md="3" xs="12">₹{items.price}</td>
                                                <td className="col-sm-12 col-md-3" md="3" xs="12">{items.quantity}</td>
                                            </tr>
                                        )
                                    })}
                            </tbody>
                        </Table>
                    </Scrollbars>
                    : 
                        <Col className="text-center">
                            <Spinner animation="grow" variant="dark" />
                            <Spinner animation="grow" variant="dark" />
                            <Spinner animation="grow" variant="dark" />
                        </Col>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default OrdersDetails
