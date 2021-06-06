import React , { useState , useEffect  } from "react";
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import axios from 'axios'

import {Navbar, Nav } from 'react-bootstrap';
import './Header.css';
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Home from "./Home";


const Header_front = () => {
  
  const backend_url = "https://api-v1-backend.herokuapp.com";
  // const backend_url = "http://localhost:8000";

const [setJwt, UpdatesetJwt] = useState(null);

const [_image_name_, update_image_name_] = useState("http://"+window.location.host+"/profile.png");
  // const backend_url = "https://api-v1-backend.herokuapp.com";
  
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
  
  useEffect(() => {
  
    if(setJwt != null){
    const interval = setInterval(() => {
      axios.get(backend_url+'/api/token/new/',{ headers: {'Authorization': `Bearer ${setJwt}`},withCredentials: true})
          .then((respose) => {
            // console.log(respose.data)
            try{
            UpdatesetJwt(respose.data["access"]);
            }catch(e)
            {
               UpdatesetJwt(null);
            }
            
          })
          .catch((error) => {
              // console.log(error)
              UpdatesetJwt(null);
          })
    }, 270000);
    return () => clearInterval(interval);
  }
  
  }, [setJwt]);


return (
 	<>
   {
  (setJwt === null)
          ? 
 	<BrowserRouter>
	<Navbar bg="light" expand="sm">
	   <Nav><Link className="" to="/home"><img src="/home.jpg" alt='Opps something went wrong' widht='50px' height='50px;'/></Link></Nav>
	  <Navbar.Toggle aria-controls="basic-navbar-nav" />
	  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
	      <Nav><Link  style={{"textDecoration": "none"}} className="hover_effect" to="/home">Home</Link></Nav>
	      <Nav><Link   style={{"textDecoration": "none"}} className="hover_effect" to="/login">Login</Link></Nav>
	      <Nav ><Link  style={{"textDecoration": "none"}} className="hover_effect"  to="/Signup">Signup</Link></Nav>
	    </Nav>
	  </Navbar.Collapse>
	</Navbar>
		<Switch>
	    	<Route path="/home">
           <Home />
        </Route>
          <Route path="/login">
           <Login />
          </Route>
          <Route path="/Signup">
           	<Signup />
          </Route>
        </Switch>
</BrowserRouter>
:
<BrowserRouter>
	<Navbar bg="light" expand="sm">
	   <Nav><Link className="" to="/home"><img className="avatar" src={_image_name_} alt='Opps something went wrong' widht='50px' height='50px;'/></Link></Nav>
	   <Navbar.Toggle aria-controls="basic-navbar-nav" />
	  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
	      <Nav><Link  style={{"textDecoration": "none"}} className="hover_effect" to="/home">Home</Link></Nav>
        
        <div className="dropdown overlays_issue">
          <button className="dropbtn">Dashboard</button>
          <div className="dropdown-content">
           <Nav><Link  style={{"textDecoration": "none"}}  to="/Dashboard">Dashboard</Link></Nav>
          </div>
        </div>
	      <Nav ><Link  style={{"textDecoration": "none"}} className="hover_effect"  to="/logout">logout
          </Link></Nav>
        
	    </Nav>
	  </Navbar.Collapse>
	</Navbar>
		<Switch>
		    <Route path="/home">
           <Home />
        </Route>

        <Route path="/Dashboard">
           <Dashboard />
        </Route>

        <Route path="/logout">
           <Logout />
        </Route>

        </Switch>
    </BrowserRouter>
}
 	</>
	);
};

export default Header_front;