import React, { useContext,useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import '../App.css';
import { UserContext } from '../App';
import MenuIcon from '@material-ui/icons/Menu';


export default function ButtonAppBar() {
  const history=useHistory();
  const {state,dispatch}=useContext(UserContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const renderlist=()=>{
    if(state){
      return (
        <>
        <li className="nav-item">
          <Link to={"/home"}><Button onClick={handleNavCollapse}>Home</Button></Link>
        </li>
        <li className="nav-item">
          <Link to={"/group"}><Button onClick={handleNavCollapse}>Group chat</Button></Link>
        </li>
        <li className="nav-item">
          <Link to={"/personal"}><Button onClick={handleNavCollapse}>Personal chat</Button></Link>
        </li>
        <li className="nav-item ml-2">
          <Button variant="contained" color="default" component="span" onClick={()=>{
            localStorage.clear();
            dispatch({type:"CLEAR"})
            history.push('/');
          }}>
            Log Out
          </Button>
        </li>
          </>
      )
    }
    else{
      return (
        <>
        <li className="nav-item">
        <Link to={"/"}><Button onClick={handleNavCollapse}>Home</Button></Link>
        </li>
        <li className="nav-item">
        <Link to={"/signin"}><Button onClick={handleNavCollapse}>Sign In</Button></Link>
        </li>
        <li className="nav-item">
        <Link to={"/signup"}><Button onClick={handleNavCollapse}>Sign Up</Button></Link>
        </li>
        </>
      )
    }
  }

return(
<nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"rgb(32 122 31)"}}>
  <div className="container-fluid">
    <h6 className="navbar-brand" style={{fontFamily:"Grand Hotel",margin:"0px",padding:"0px",color:"white",fontSize:"30px"}}>
    <Link style={{color:'white'}} to={"/"}>Chatroom</Link>
    </h6>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
      <MenuIcon style={{width:"30px",height:"30px"}}/>
    </button>
    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
      {renderlist()}
      </ul>
    </div>
  </div>
</nav>
);

}