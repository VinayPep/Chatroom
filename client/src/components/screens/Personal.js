import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../App'
import SocketG from './SocketP';
export default function Personal() {
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
        <h2 className="text-center mt-2">Welcome to Personal chat !!!</h2>
        <div className="d-flex justify-content-evenly ">
            <div className="col-4 col-md-2 bg-light py-4 rounded">
                <h6>Registered Users</h6>
                {data.map((item)=>{
                    return <li>{item.name}</li>
                    })}
            </div>
            <div className="col-8 col-md-10 mt-2 App">
                <SocketG/>
            </div>
        </div>
        
        </>
    );

}