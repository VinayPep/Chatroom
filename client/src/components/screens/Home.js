import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import personal_img from '../img/personal.png'
import group_img from '../img/group.png'


export default function Home() {
  const [data, setdata] = useState([]);
  const history = useHistory();
 
  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '15px' }}>Welcome {JSON.parse(localStorage.getItem('user').toUpperCase())}!!!!!</h1>
      <ol>
        {/* {data.map((item)=>{
      return <li>{item.name}</li>
    })} */}
      </ol>
      <div className="Home_img_div">
        <div style={{display:'flex',flexDirection:'column'}}>
          <Link to={'/group'}><img className="home_img zoom2" width='350px' height='260px' src={group_img}/></Link>
          <button type="button" className="btn btn-primary btn-lg m-5" onClick={() => history.push('/group')}>Group chat</button>
        </div>
        <div style={{display:'flex', flexDirection:'column'}}>
          <Link to={'/personal'}><img className="home_img zoom2" width='350px' height='260px' src={personal_img}/></Link>
          <button type="button" className="btn btn-primary btn-lg m-5" onClick={() => history.push('/personal')}>Personal chat</button>
        </div>
      </div>
    </>
  )
}
