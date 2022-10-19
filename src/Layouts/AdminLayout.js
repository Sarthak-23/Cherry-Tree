import React from 'react'
import Navbar from '../components/Admin/Navbar';
// import { useSelector } from 'react-redux';
// import {useHistory} from 'react-router-dom';

// const mapState = ({user}) => ({
//     currentUser: user.currentUser
// });

const AdminLayout = props => {
    // const { currentUser } = useSelector(mapState);
    // const history = useHistory();

    // useEffect(() => {
    //     if (!currentUser) {
    //         history.push('/');
    //     }
    // }, [currentUser]);

    return (
        <>
            <Navbar {...props} />
            {props.children}
        </>
    )
}

export default AdminLayout
