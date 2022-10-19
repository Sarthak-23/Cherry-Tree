import React,{useEffect, useState} from 'react'
import { Col, Container, Row ,Form, Button} from 'react-bootstrap'
import { FaAddressBook,FaAddressCard, FaPhoneAlt, FaCreditCard, FaRegCalendarAlt, FaKey } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { selectCartTotal, selectCartItemsCount, selectCartItems } from '../../redux/Cart/cart.selectors';
import { useSelector,useDispatch } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { saveOrderHistory } from '../../redux/Orders/orders.actions';
import { useHistory } from 'react-router-dom';

const mapState = createStructuredSelector({
    total: selectCartTotal,
    itemCount: selectCartItemsCount,
    cartItems: selectCartItems,
});


const Checkout = () => {
    const { total, itemCount, cartItems } = useSelector(mapState);
    const dispatch = useDispatch();
    const history = useHistory();
    const [restaurantuid,setRestaurantuid] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [card,setCard] = useState('');
    const [date,setDate] = useState('2021-03');
    const [cvc,setCvc] = useState('');

    useEffect(() => {
        if(itemCount<1) {
            history.push({
                pathname: '/feedback',
                state: {restaurantuid:restaurantuid}
            });
        }
    },[itemCount])


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(!name || !address || !phone || !card || !date || !cvc)
        {
            toast.error('Please Fill all the fields',{
                position:'top-right'
            });
            return;
        }
        if(phone.length<10 || phone.length>10)
        {
            toast.error('Please Fill valid Phone Number',{
                position:'top-right'
            });
            return;
        }
        if(cvc.length>3 || cvc.length<3)
        {
            toast.error('Please Fill correct details of your card',{
                position:'top-right'
            });
            return;
        }
        if(isNaN(cvc))
        {
            toast.error('Please Fill correct details of your card',{
                position:'top-right'
            });
            return;
        }

        const configOrder = {
            orderTotal: total,
            orderItems: cartItems.map(item => {
                const { documentID, url, name, price, quantity } = item;
                return {
                    documentID,
                    url,
                    name,
                    price,
                    quantity,
                };
            }),
            productAdminUserUID: cartItems[0].productAdminUserUID,
            name,
            address,
            phone
        }
        setRestaurantuid(configOrder.productAdminUserUID);
        dispatch(
            saveOrderHistory(configOrder)
        );
    }

    return (
        <Container className="p-5">
            <Row xs="12" className="mt-5 shadow p-md-5 p-sm-5 bg-white rounded justify-content-md-center">
                <Col md="12" sm="12" xs="12" className="m-3">
                        <ToastContainer/>
                        <Col className="ml-5 mb-4 info_home">
                            <p>CheckOut Details</p>
                        </Col>
                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaAddressBook/></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Recipient Name" autoComplete="off"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaAddressCard /></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="address" value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter your Delivery Address" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaPhoneAlt /></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Your Phone Number" />
                                </Col>
                            </Form.Group>
                            
                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaCreditCard /></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="card" value={card} onChange={(e) => setCard(e.target.value)} type="number" placeholder="Your Card Number" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaRegCalendarAlt /></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="date" value={date} onChange={(e) => setDate(e.target.value)} type="month"/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><FaKey /></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.Control name="cvc" value={cvc} onChange={(e) => setCvc(e.target.value)} type="password" placeholder="Your CVC Number" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Col xs={{ span: 11, offset: 1 }}>
                                    <Button variant="dark" type="submit" onClick={handleFormSubmit}>Pay Now</Button>
                                </Col>
                            </Form.Group>
                        </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Checkout
