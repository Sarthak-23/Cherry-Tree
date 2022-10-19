import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotal } from '../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { useHistory } from 'react-router-dom'
import { Col, Container, Row, Button} from 'react-bootstrap'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Items from './Items'
import './cart.css'

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

const Cart = props => {
    const { cartItems, total } = useSelector(mapState);
    const history = useHistory();
    return (
        <Container className="p-5 parent">
            <Row className="p-3">
                <Col>
                    <h1 className="shopping mt-2 mb-4">Shopping Cart</h1>
                    {cartItems.length > 0 ? (
                        <>
                            <Scrollbars style={{ height: 400 }}>
                                {cartItems.map((item,pos)=> {
                                    return (
                                        <Items {...item} key={pos}/>
                                    );
                                })}
                            </Scrollbars>
                            <p className="float-right mt-5">Total: ₹ {total}</p>
                        </>
                    ): (
                        <p>You have no items in your cart.</p>
                    )}

                </Col>
            </Row>
            <Row className="mb-0 mr-3 ml-3" style={{justifyContent:"space-between"}}>
                {cartItems.length> 0 &&
                    <>
                        <Button variant="dark" className="mt-2" onClick={()=> history.goBack() }> Continue Shopping</Button>
                        <Button variant="success" className="mt-2" onClick={()=>history.push('/checkout')}> Checkout</Button>
                    </>
                }
            </Row>
        </Container>
    )
}

export default Cart
