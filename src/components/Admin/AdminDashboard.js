import React ,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Card, CardDeck, Modal, Form } from 'react-bootstrap'
import { MdEdit, MdDelete } from "react-icons/md";
import { addProductStart, editProductStart , fetchProductsStart, deleteProductStart } from '../../redux/Product/products.actions';
import { ToastContainer, toast } from 'react-toastify';
import ProgressB from '../Homepage/ProgressBar';

const mapState = ({ productsData,user }) => ({
    products: productsData.products,
    currentUser: user.currentUser
});


const AdminDashboard = props => {
    const dispatch = useDispatch();
    
    const { products, currentUser } = useSelector(mapState);
    const [modalShow, setModalShow] = useState(false);
    const [editmodalShow, setEditModalShow] = useState(false);
    const [editContent, setEditContent] = useState('');

    const ownerid = currentUser?currentUser.id:"id";
    const types = ['image/png', 'image/jpeg'];
    useEffect(()=> {
        dispatch(
            fetchProductsStart(ownerid)
        );

    }, []);

    function AddItemModal(props) {
        const dispatch = useDispatch();
        const [name,setName] = useState('');
        const [price,setPrice] = useState('');
        const [file,setFile] = useState(null);
        const [url, setUrl] = useState(null);
        const [category,setCategory] = useState('');
        const [errors, setErrors] = useState('');
        const resetForm = () => {
            setModalShow(false);
            setName('');
            setPrice('');
            setFile(null);
            setCategory('');
        }
    
    
        const handleSubmit = (e) => {
            // var price = parseInt(price);
            e.preventDefault();
            if(!name||!price || !url || !category)
            {
                toast.error('Please Fill all the fields',{
                    position:'top-right'
                });
                return;
            }
            if(errors){
                toast.error(errors,{
                    position:"top-right"
                });
                return;
            }
            dispatch(
                addProductStart({
                    name,
                    price:parseInt(price),
                    url,
                    category
                })
            );
            resetForm();
        };
        const changehandler = (e) => {
            let selected = e.target.files[0];
            // console.log(selected);
            // console.log(types.includes(selected.type));
            // console.log(selected && types.includes(selected.type));
            if(selected && types.includes(selected.type)) {
                setFile(selected);
                setErrors('');
            } 
            else{
                setFile(null);
                // const Err = ['Please Select an image file (png or jpeg)'];
                setErrors('Please Select an image file (png or jpg or jpeg)');
            }
        }

        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add New Item
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    { file && 
                        <Form.Group as={Row}>
                            <Form.Label column md="1" xs="1"><i className="zmdi zmdi-lock material-icons-name"></i></Form.Label>
                            <Col md="10" xs="10">
                                <ProgressB file={file} setFile={setFile} setUrl={setUrl}/>
                            </Col>
                        </Form.Group>
                    }
                    <Form.Group as={Row}>
                        <Form.Label column md="1" xs="1"><i className="zmdi zmdi-email material-icons-name"></i></Form.Label>
                        <Col md="10" xs="10">
                            <Form.Control type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of the Item" />
                        </Col>
                    </Form.Group>
    
                    <Form.Group as={Row}>
                        <Form.Label column md="1" xs="1"><i className="zmdi zmdi-lock material-icons-name"></i></Form.Label>
                        <Col md="10" xs="10">
                            <Form.Control type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
                        </Col>
                    </Form.Group>
    
                    <Form.Group as={Row}>
                        <Form.Label column md="1" xs="1"><i className="zmdi zmdi-lock material-icons-name"></i></Form.Label>
                        <Col md="10" xs="10">
                            <Form.Control type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category eg: Breakfast, snack,etc." />
                        </Col>
                    </Form.Group>
    
                    <Form.Group as={Row}>
                                <Form.Label column md="1" xs="1"><i className="zmdi zmdi-lock material-icons-name"></i></Form.Label>
                                <Col md="10" xs="10">
                                    <Form.File onChange={changehandler} />
                                </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col xs={{ span: 10, offset: 1 }}>
                            <Button onClick={handleSubmit} variant="dark">Add Product</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    function EditItemModal(props) {
        const [name,setName] = useState(props.data.name);
        const [price,setPrice] =  useState(props.data.price);
        const [category,setCategory] = useState(props.data.category);
        const dispatch = useDispatch();
        const { documentID, url, createDate, productAdminUserUID } = props.data;
        // const documentID = props.data.documentID;
        // const resetForm = () => {
        //     setModalShow(false);
        //     setEName('');
        //     setEPrice('');
        //     setFile(null);
        //     setCategory('');
        // }

        const handleEditSubmit = (e) => {
            // var price = parseInt(price);
            e.preventDefault();
            dispatch(
                editProductStart({
                    name,
                    price:parseInt(price),
                    category,
                    documentID,
                    url,
                    createDate,
                    productAdminUserUID
                })
            );
            setEditModalShow(false);
            // resetForm();
        };
        // console.log(props);
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Item
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column md="1" xs="1"><i className="zmdi zmdi-email material-icons-name"></i></Form.Label>
                        <Col md="10" xs="10">
                            <Form.Control type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name of the Item" />
                        </Col>
                    </Form.Group>
    
                    <Form.Group as={Row}>
                        <Form.Label column md="1" xs="1"><i className="zmdi zmdi-lock material-icons-name"></i></Form.Label>
                        <Col md="10" xs="10">
                            <Form.Control type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" />
                        </Col>
                    </Form.Group>
    
                    <Form.Group as={Row}>
                        <Form.Label column md="1" xs="1"><i className="zmdi zmdi-lock material-icons-name"></i></Form.Label>
                        <Col md="10" xs="10">
                            <Form.Control type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category eg: Breakfast, snack,etc." />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col xs={{ span: 10, offset: 1 }}>
                            <Button variant="dark" onClick={handleEditSubmit}>Update Product</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        );
    }

    const EditFunc = (documentID) => {
        setEditModalShow(true);
        products.map((prod, idx) => {
            if(prod.documentID === documentID) 
            {
                setEditContent(prod); 
                return;
            }
            // console.log(prod );
        })
    }

    return (
        <Container fluid className="p-5">
            <Row className="p-5 align-items-center justify-content-center">
                <ToastContainer/>
                <CardDeck>
                    {products.map((product, index) => {
                        const {
                            name,
                            price,
                            url,
                            documentID
                        } = product;
                        return(
                            <Col key={index}>
                                <Card style={{ width: '18rem' }} className=" shadow-lg mr-3 mb-5 card2" key={index}>
                                    <Card.Img className="inner-img" variant="top" src={url} alt="name" style={{height:"163px"}} />
                                    <Card.Body>
                                        <Card.Title>{name}</Card.Title>
                                        <Card.Text>
                                            ₹{price}
                                            <MdDelete style={{cursor:"pointer"}} className="float-right delete" onClick={()=> dispatch(deleteProductStart(documentID))}/>
                                            <MdEdit style={{cursor:"pointer"}} className="float-right edit" onClick={() => EditFunc(documentID)} />
                                            <EditItemModal 
                                                show={editmodalShow}
                                                onHide={() => setEditModalShow(false)}
                                                data={editContent}
                                            />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </CardDeck>
            </Row>
            <Row className="p-5 align-items-center justify-content-center">
                <Button variant="success" className="btn btn-lg float-right" onClick={() => setModalShow(true)}>Add Item</Button>
                <AddItemModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </Row>
        </Container>
    )
}

export default AdminDashboard
