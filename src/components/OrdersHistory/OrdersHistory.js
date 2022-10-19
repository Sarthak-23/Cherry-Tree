import React,{ useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrderHistory } from '../../redux/Orders/orders.actions'
import moment from 'moment'
import { useHistory } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars-2';

const mapState = ({ user, ordersData }) => ({
    currentUser: user.currentUser,
    ordershistorydata: ordersData.orderHistory.data
});


const OrdersHistory = () => {
    const disptach = useDispatch();
    const { currentUser, ordershistorydata } = useSelector(mapState);
    const history = useHistory();
    // console.log(ordershistorydata);

    useEffect(()=>{
        disptach(
            getUserOrderHistory(currentUser.id)
        );
    },[]);

    return (
        <Container className="p-5">
            <Row xs="12" className="mt-5 shadow p-5 mb-5 bg-white rounded justify-content-center">
                <Col md="12" sm="12" xs="12">
                        <Col className="mb-4 info_home">
                            <p>Order History</p>
                        </Col>
                    {(ordershistorydata)&&ordershistorydata.length>0? 
                        <Scrollbars  style={{ height: 425 }}>
                            <Table responsive="md" striped bordered hover variant="dark" className="text-center">
                                <thead style={{position:"sticky", top:"0", backgroundColor:"black"}}>
                                <tr>
                                    <th>Order Date</th>
                                    <th>Order Id</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                                <tbody style={{cursor:"pointer"}}>
                                    {(Array.isArray(ordershistorydata) && ordershistorydata.length> 0) && ordershistorydata.map((items,key)=> {
                                        return (
                                            <tr key={key} onClick={()=> history.push(`/order/${items.documentID}`)}>
                                                <td>{moment(items.orderCreatedDate.seconds*1000).format('DD/MM/YYYY')}</td>
                                                {/* <td>{date}</td> */}
                                                <td>{items.documentID}</td>
                                                <td>₹{items.orderTotal}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </Scrollbars>
                    : 
                        "You haven't made a purchase yet. You must first place an order before viewing the order history."
                    }
                    
                </Col>
            </Row>
        </Container>
    )
}

export default OrdersHistory
