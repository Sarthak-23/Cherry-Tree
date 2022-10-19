import React,{ useEffect } from 'react'
// import { useSelector } from 'react-redux';
import {Carousel} from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';


// const mapState = (state) => ({
//     currentUser: state.user.currentUser
// });


const Caro = props => {
    // const { currentUser } = useSelector(mapState);
    
    // useEffect(() => {
    //     if(currentUser){
    //         toast.success('Login Successful',{
    //             position:'top-right'
    //         });
    //     }
    // },[]);

    return (
            <>
            {/* <ToastContainer/> */}
            <Carousel className="caro">
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + 'images/fast.jpg'}
                    // "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/fast.jpg?alt=media&token=d0b23800-5c9b-4b69-b511-831ab06730c2"
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + 'images/north.jpg'}
                    // "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/north.jpg?alt=media&token=e3f025ce-18d1-4f25-8aab-3d55f07f6e83"
                    alt="Second slide"
                    />

                </Carousel.Item>

                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={process.env.PUBLIC_URL + 'images/south.jpg'}
                    // "https://firebasestorage.googleapis.com/v0/b/cherry-tree-7fd49.appspot.com/o/south.jpg?alt=media&token=66a0502f-fd52-475b-8131-faea8982ddff"
                    alt="Third slide"
                    />

                </Carousel.Item>
            </Carousel>
            </>
    )
}

export default Caro
