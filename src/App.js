import './App.css';
import {createBrowserHistory} from 'history'
import { Route, Router, Switch } from 'react-router';
import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Detail from './pages/Detail/Detail';
import Checkout from './pages/Checkout/Checkout';
import CheckoutTemplate from './templates/CheckoutTemplate/CheckoutTemplate';
import {Suspense, lazy} from 'react'
import { UseTemplate } from './templates/UserTemplate/UseTemplate';
import Loading from './components/Loading/Loading';
import Profile from './Profile/Profile';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import Dashboad from './pages/Admin/Dashboard/Dashboad';
import Films from './pages/Admin/Films/Films';
import Showtime from './pages/Admin/Showtime/Showtime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';


//const CheckoutTemplateLazy = lazy(()=> import('./templates/CheckoutTemplate/CheckoutTemplate.js'))

export const history = createBrowserHistory()
function App() {
  return (

    <Router history={history}>
      <Loading />
      <Switch>
      <HomeTemplate path='/home' exact Component={Home} />
      <HomeTemplate path='/contact' exact Component={Contact} />
      <HomeTemplate path='/detail/:id' exact Component={Detail} />
      <HomeTemplate path='/profile' exact Component={Profile} />
      <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />
      <HomeTemplate path='/news' exact Component={News} />
      <UseTemplate path='/login' exact Component={Login} />
      <UseTemplate path='/register' exact Component={Register} />


      <AdminTemplate path='/admin' exact Component={Dashboad} />
      <AdminTemplate path='/admin/films' exact Component={Films} />
      <AdminTemplate path='/admin/films/addnew' exact Component={AddNew} />
      <AdminTemplate path='/admin/films/edit/:id/:tenPhim' exact Component={Edit} />
      <AdminTemplate path='/admin/films/showtime/:id/:tenPhim' exact Component={Showtime} />

      <AdminTemplate path='/admin/users' exact Component={Dashboad} />
      {/* <AdminTemplate path='/admin/showtime' exact Component={Showtime} /> */}
      </Switch>
      <HomeTemplate path='/' exact Component={Home} />
    </Router>
  );
}

export default App;
