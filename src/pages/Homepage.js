import React from 'react'
import Jumbotron from '../components/Homepage/Jumbotron_home';
import Carousel from '../components/Homepage/Caro';
import Card from '../components/Homepage/cards';
import Additonal from '../components/Homepage/Additonal';
import Infohome from '../components/Homepage/Info_Home';
// import { useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';

// const mapState = (state) => ({
//     currentUser: state.user.currentUser
// });


const Homepage = props => {
    // const [state,setState] = useState(true);
    // const { currentUser } = useSelector(mapState);
    
    // useEffect(() => {
    //     if(currentUser && state){
    //         toast.success('Login Successful',{
    //             position:'top-right'
    //         });
    //         setState(false);
    //     }
    // });

    return (
        <>
            {/* <ToastContainer/> */}
            <Jumbotron/>
            <Carousel />
            <Additonal/>
            <Infohome/>
            <Card />
        </>
    )
}

export default Homepage
