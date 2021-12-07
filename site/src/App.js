import logo from './images/logo.svg';
import MainHeader from './MainHeader';
import Footer from './Footer';
import Login from './Login.js'
import SignUp from './SignUp.js'
import {Route, Switch} from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import MainPage from './MainPage';
import SubCategory from './SubCategory';
import QuestionsList from './QuestionsList';
import Questions from './Forms/questions';
import Question from './Question';
import Sidebar from './Sidebar';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <MainHeader/>
            <Sidebar/>
            <MainPage />
            <Footer/>
          </Route>
          <Route path='/subCategory'> 
              <MainHeader /> 
              <Sidebar/>
              <SubCategory/>
              <Footer/>
          </Route>
          <Route path='/questionsList'> 
              <MainHeader />
              <Sidebar/>
              <QuestionsList/> 
              <Footer/>
          </Route>
          <Route path='/questionform'> 
              <MainHeader />
              <Sidebar/>
              <Questions/> 
              <Footer/>
          </Route>
          <Route path='/question'> 
              <MainHeader />
              <Sidebar/>
              <Question/>
              <Footer/>
          </Route>
          <Route path='/login'> 
              <MainHeader />
              <Sidebar/>
              <Login/> 
              <Footer/>
          </Route>
          <Route path='/signup'>
              <MainHeader/>
              <Sidebar/>
              <SignUp/> 
              <Footer/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
