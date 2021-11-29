import logo from './images/logo.svg';
import MainHeader from './MainHeader';
import Footer from './Footer';
import Login from './Login.js'
import SignUp from './SignUp.js'
import {Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from './MainPage';
import Category from './Forms/category';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <MainHeader/>
            <MainPage />
            <Footer/>
          </Route>
          <Route path='/category'> 
              <MainHeader />
              <Category/> 
              <Footer/>
          </Route>
          <Route path='/login'> 
              <MainHeader />
              <Login/> 
              <Footer/>
          </Route>
          <Route path='/signup'>
              <MainHeader/>
              <SignUp/> 
              <Footer/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
