import React , { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const Dashboard = () => {

  const backend_url = "https://api-v1-backend.herokuapp.com";
  // const backend_url = "http://localhost:8000";
  const [setJwt, UpdatesetJwt] = useState(null);

  useEffect(() => {
    axios.post(backend_url+'/api/access/refresh/',{payload:null},{ withCredentials: true })
        .then((respose) => {
        // console.log(res.data)
              try{
                    UpdatesetJwt(respose.data["access"]);
                }catch(e){
                    UpdatesetJwt(null);
                }
        })
        .catch((error) => {
                try{
                    UpdatesetJwt(null);
                }catch(e){}
        })
},[]);


return (
  <>
   {
  (setJwt === null)
  ? 
  <p><center>Something went wrong</center></p>
  :
  <p><center>Welcome to Dashboard</center></p>
   }

  </>
  );
};

export default Dashboard;