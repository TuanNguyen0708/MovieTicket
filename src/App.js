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
      <HomeTemplate path='/news' exact Component={News} />
      <UseTemplate path='/login' exact Component={Login} />
      <Route path='/register' exact component={Register} />
      <CheckoutTemplate path='/checkout/:id' exact Component={Checkout} />
      </Switch>
      <HomeTemplate path='/' exact Component={Home} />
    </Router>
  );
}

export default App;
