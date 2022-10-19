import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button,Card,CardDeck } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import {fetchProductsStart, setProducts} from '../../redux/Product/products.actions';
import { selectCartItems } from '../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect'
import { addProduct } from '../../redux/Cart/cart.actions'
import { MucicLists } from '../Player/MusicLists';
import Player from '../Player/Player';
import { ToastContainer, toast } from 'react-toastify';

const mapState = ({ productsData }) => ({
    products: productsData.products,
});

const mapState1 = createStructuredSelector({
    cartItems: selectCartItems,
});

// console.log(allCatValues);

const Main = props => {
    const dispatch = useDispatch();
    const location = useLocation();
    // console.log(location.state.ID);
    const { products } = useSelector(mapState);
    const { cartItems } = useSelector(mapState1);
    // console.log(products);
    
    
    const [items,setItems] = useState(products);
    const [visit,setVisit] = useState(false);
    const [songs] = useState(MucicLists);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

    useEffect(()=> {
        dispatch(
            fetchProductsStart(location.state.ID)
        )
        
        return () => {
            dispatch(
                setProducts([])
            )
        }
            
    }, []);
            

    useEffect(()=>{
        setNextSongIndex(() => {
            if (currentSongIndex + 1 > songs.length -1){
                return 0;
            }
            else {
                return currentSongIndex + 1;
            }
        })
    }, [currentSongIndex]);

    const allCatValues = [...new Set(products.map((curr)=> curr.category )), 'All'];
    
    const filterItem = (categ)=>{
        setVisit(true);
        if(categ==='All')
        {
            setItems(products);
            return
        }
        
        const filteredItem = products.filter((curr)=>{
            return curr.category===categ;
        })
        
        setItems(filteredItem);
    }

    const handleAddToCart = (product) => {
        if (!product)   return;
        if(cartItems.length>0)
        {
            if(product.productAdminUserUID!== cartItems[0].productAdminUserUID)
            {
                toast.error('Cannot order from multiple restaurants',{
                    position:'top-right'
                });
                return;
            }
        }
        dispatch(
            addProduct(product)
        )
    }

    return (
        <Container fluid className="res">
            <Row fluid style={{padding:"0"}}>
            <ToastContainer/> 
                <Col fluid md={4} className="mt-5" data-aos="flip-left">
                    <Player
                        currentSongIndex={currentSongIndex}
                        setCurrentSongIndex={setCurrentSongIndex}
                        nextSongIndex={nextSongIndex}
                        songs={songs}
                    />
                </Col>
                <Col md={7}>
                    <div md={5} className="button_content mt-3 mb-5">
                        {
                            allCatValues.map((currElem,index)=>{
                                return <button className="btn-group__item" key={index} onClick={()=> filterItem(currElem)}>{currElem}</button>
                            })   
                        }
                    </div>
                    <Row className="align-items-center justify-content-center">
                        {/* <CardDeck> */}
                            {visit?items.map((product, index) => {
                                const {
                                    name,
                                    price,
                                    url,
                                    documentID
                                } = product;
                                    return(
                                        <Col className="center_elements" data-aos="flip-right">
                                            <Card style={{ width: '18rem' }} className="card2 shadow-lg mr-3 mb-5" key={index}>
                                                <Card.Img className="inner-img" variant="top" src={url} alt={name} style={{height:"163px"}} />
                                                <Card.Body>
                                                    <Card.Title>{name}</Card.Title>
                                                    <Card.Text>
                                                        ₹{price}
                                                        <Button variant="outline-success" className="float-right" onClick={()=> handleAddToCart(product)}>Add To Cart</Button>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            :
                            products.map((product, index) => {
                                const {
                                    name,
                                    price,
                                    url,
                                    documentID
                                } = product;
                                    return(
                                        <Col className="center_elements" style={{padding:"0"}} data-aos="flip-right">
                                            <Card style={{ width: '18rem' }} className="card2 shadow-lg mr-3 mb-5" key={index}>
                                                <Card.Img className="inner-img" variant="top" src={url} alt={name} style={{height:"163px"}} />
                                                <Card.Body>
                                                    <Card.Title>{name}</Card.Title>
                                                    <Card.Text>
                                                        ₹{price}
                                                        <Button variant="outline-success" className="float-right" onClick={()=> handleAddToCart(product)}>Add To Cart</Button>
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        {/* </CardDeck> */}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Main
