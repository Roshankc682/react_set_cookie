import React , { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner , Alert } from 'react-bootstrap';
import './Form.css';
import axios from 'axios'

const Logout = () => {
  const backend_url = "https://api-v1-backend.herokuapp.com";
  // const backend_url = "http://localhost:8000";
   
const [setJwt, UpdatesetJwt] = useState(null);

 useEffect(() => {
        axios.get(backend_url+'/api/logout',{ withCredentials: true })
        .then((res) => {
          try{
            UpdatesetJwt(null);
            console.log("yes logout")
            window.location.href = "http://"+window.location.host+"/login";
          }catch(e){
           
            console.log("Errro 1")
          }
        })
        .catch((error) => {
         try{
            UpdatesetJwt(null);
            
            console.log("Errro 3")
            window.location.href = "http://"+window.location.host+"/login";
          }catch(e){
            
            console.log("Errro 4")
            
          }
        })
  },[]);



return (
  <> 
  {
  (setJwt === null)
  ?  
      <div className="alert_center">
      <Alert variant="danger">You will be logged out .....</Alert>
      <div className="alert_center">
            <Spinner animation="grow" variant="success" />
      </div>
    </div>
        
   :
   <div>
      
   </div>
 }
  </>
  );
};

export default Logout;