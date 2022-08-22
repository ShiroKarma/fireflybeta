import Path from './component/Staff/Path';
import Register from './component/login _ register/Register';
import Document from './component/Document';
import Verify from './component/Staff/Verify';
import LogIn from './component/Login'
import Error from './component/Error';
import Firefly from './component/camera/Firefly'
import Header from './component/HomePage/Header';
import { Route,Switch } from 'react-router-dom';
import Format from './component/Map/Formholder';
import SendMessage from './component/Map/Map';
export default function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/' exact>
          <LogIn/>
        </Route>
        <Route path='/register'>
          <Register/>
        </Route>
        <Route path='/camera'>
          <Firefly/>
        </Route>
        <Route path='/form'>
          <Format/>
        </Route>
        <Route path='/path' exact>
          <Path />
        </Route>
        <Route path='/verify'>
          <Verify />
        </Route>
        <Route path='*'>
          <Error />
        </Route>
        <Route paht='doc'>
          <Document/>
        </Route>
      </Switch>
    </div>)
}