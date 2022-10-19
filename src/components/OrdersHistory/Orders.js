import React, { useEffect } from 'react'
import { Col, Container, Row, Table, Image,Spinner } from 'react-bootstrap'
import { useParams } from 'react-router'
import { getOrderDetailsStart, setOrderDetails } from '../../redux/Orders/orders.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars-2';


const mapState = ({ ordersData }) => ({
    orderDetails: ordersData.orderDetails
});


const Orders = () => {
    const { orderID } = useParams();
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(mapState);
    const { orderTotal } = orderDetails;
    const orderItems = orderDetails && orderDetails.orderItems;

    useEffect(()=>{
        dispatch(
            getOrderDetailsStart(orderID)
        );
        return () => {
            dispatch(
                setOrderDetails({})
            );
        }
    }, []);

    return (
        <Container className="p-5">
            <Row xs="12" className="mt-5 shadow p-5 mb-5 bg-white rounded justify-content-center">
                <Col md="12" sm="12" xs="12">
                    <Col className="mb-4 info_order">
                            <p>Order Id #{orderID?orderID:""}</p>
                    </Col>
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
                                    {/* <Scrollbars style={{ height: 400 }}> */}
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
                                    {/* </Scrollbars> */}
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
            <Row style={{float:"right"}} className="mr-5">
                <h5> Total Amount: ₹ { orderTotal }</h5>
            </Row>
        </Container>
    )
}

export default Orders
