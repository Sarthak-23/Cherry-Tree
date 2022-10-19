import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch} from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';

//CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//Auth
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';
import { checkUserSession } from './redux/User/user.actions';

//components
import Recovery from './components/Recovery/recovery';
import AdminLogin from './pages/Adminlogin';
import AdminSignup from './pages/AdminSignup'
import Main from './components/Restaurants/Main'
import Dashboard from './components/Admin/AdminDashboard';
import Orders from './components/Admin/Orders';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import OrdersHistory from './components/OrdersHistory/OrdersHistory';
import UserOrders from './components/OrdersHistory/Orders';
import OrdersDetails from './components/Admin/OrdersDetails';
import Ratings from './components/Ratings/Ratings';
import FeedbackPage from './components/Ratings/FeedbackPage';

//Pages
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Homepage from './pages/Homepage'

//Layouts
import MainLayout from './Layouts/MainLayout';
import RestaurantsLayout from './Layouts/RestaurantsLayout';
import AdminLayout from './Layouts/AdminLayout';
import CartLayout from './Layouts/CartLayout'

const App = props => {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(checkUserSession());

  }, []);

  useEffect(()=> {
    Aos.init({
      duration:1000
    });
    Aos.refresh();
  },[])

  return (
    <Switch>
        <Route path = "/login">
            <CartLayout>
              <Signin/>
            </CartLayout>
        </Route>
        
        <Route path = "/signup">
            <CartLayout>
                <Signup/>
            </CartLayout>
        </Route>

        <Route exact path="/">
            <MainLayout>
                <Homepage/>
            </MainLayout>
        </Route>

        <Route path="/cart">
          <WithAuth>
            <CartLayout>
                <Cart/>
            </CartLayout>
          </WithAuth>
        </Route>

        <Route path="/checkout">
          <WithAuth>
            <CartLayout>
                <Checkout/>
            </CartLayout>
          </WithAuth>
        </Route>

        <Route exact path="/feedback">
          <WithAuth>
            <CartLayout>
                <Ratings/>
            </CartLayout>
          </WithAuth>
        </Route>

        <Route path="/feedback/:name">
          <WithAuth>
            <CartLayout>
                <FeedbackPage/>
            </CartLayout>
          </WithAuth>
        </Route>

        <Route path="/ordershistory">
          <WithAuth>
            <CartLayout>
                <OrdersHistory/>
            </CartLayout>
          </WithAuth>
        </Route>

        <Route path="/order/:orderID">
          <WithAuth>
            <CartLayout>
                <UserOrders/>
            </CartLayout>
          </WithAuth>
        </Route>

        <Route path="/ordersDetails/:orderID">
          <WithAdminAuth>
            <AdminLayout>
                <OrdersDetails/>
            </AdminLayout>
          </WithAdminAuth>
        </Route>

        <Route path="/restaurant/:name">
            <WithAuth>
              <RestaurantsLayout>
                <Main />
              </RestaurantsLayout>
            </WithAuth>
        </Route>

        <Route path = "/recovery">
              <CartLayout>
                <Recovery />
              </CartLayout>
        </Route>

        <Route exact path = "/adminlogin">
            <CartLayout>
              <AdminLogin />
            </CartLayout>
        </Route>

        <Route path="/adminsignup">
            <CartLayout>
              <AdminSignup />
            </CartLayout>
        </Route>

        <Route path="/dashboard">
            <WithAdminAuth>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </WithAdminAuth>
        </Route>

        <Route path="/orders">
            <AdminLayout>
              <Orders />
            </AdminLayout>
        </Route>

      </Switch>
  );
}

export default App;
