import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App'
import Socket from './Socket';
export default function Group() {
    const [data, setdata] = useState([]);
    const history=useHistory();
    const {state,dispatch} = useContext(UserContext)
    useEffect(() => {
        const url = "/user";

        const fetchData = async () => {
          try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': localStorage.getItem('jwt') // ⬅⬅⬅ authorization token
                }});
            const json = await response.json();
            console.log(json);
            setdata(json);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
    }, [])

    return(
        <>
        <h2 className="text-center my-2">Welcome to group chat !!!</h2>
        <div className="d-flex justify-content-evenly ">
            <div className="col-4 col-md-2 bg-light py-4 rounded">
                <h6>Registered Users</h6>
                {data.map((item)=>{
                    return <li>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</li>
                    })}
            </div>
            <div className="col-8 col-md-10 mt-2 App">
                <Socket/>
            </div>
        </div>
        
        </>
    );

}