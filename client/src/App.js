import React, { createContext ,useReducer,useContext, useEffect} from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css'
// import Profile from './components/screens/Profile'
import Home from './components/screens/Home'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Group from './components/screens/Group'
import Navbar from './components/Navbar'
// import CreatePost from './components/screens/CreatePost'
import LandingPage from './components/screens/LandingPage'
// import UserProfile from './components/screens/UserProfile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {reducer,initialState} from './reducers/userReducer'
import Personal from './components/screens/Personal';

export const UserContext=createContext()
const Routing=()=>{
  const history=useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(() => {
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch({type:"USER",payload:user});
    }
    else{
      history.push('/');
    }
    
  },[])
  return(
    <Switch>
      <Route exact path='/'>
          <LandingPage/>
      </Route>
      <Route path='/home'>
          <Home/>
      </Route>
      <Route path='/signup'>
        <Signup/>
      </Route>
      <Route exact path='/group'>
        <Group/>
      </Route>
      <Route path='/signin'>
        <Signin/>
      </Route>      
      <Route path='/personal'>
        <Personal/>
      </Route>

    </Switch>
  );

}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <ToastContainer/>
        <Routing/>
      </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
