import React,{useState} from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from 'react-toastify';
function AdminLogin(){
    
    //Function use for Navigation
  const navigate = useNavigate(); 
  //Generating Token
  const {storeAdminToken} = useAuth();
  //checking Token
  console.log(storeAdminToken);
  //Initialize the user variable
    const [admin,SetAdmin] = useState({
        mail:"",
        pass:""
    });
    //Function for HandleInput
    const handleinput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    SetAdmin({
        ...admin,//Use Spread Operator to saving the Previous values 
        [name]:value
    });

    }
   //For Form Submission
   const handleSubmit =async (e)=>{
    e.preventDefault();
    console.log(admin);

    try {
      const response = await fetch('http://localhost:5000/api/admin/login',{
       method:'POST',
       headers:{
        "Content-Type":"application/json"
       }
       ,
       body:JSON.stringify(admin)

      });
      const res_data = await response.json();
      console.log("Response From Server for Admin Login: ",res_data);
      if(response.ok){
        const { isAdmin } = res_data;
        // Store the user data (including isAdmin) in state or context
        localStorage.setItem('isAdmin', isAdmin);
        storeAdminToken(res_data.token);
        toast.success('Login Successfully');
        navigate('/admindashboard')
      }
      else{
        if(res_data.msg){
          toast.error(res_data.msg);
        }else{
         // Handle error if response is not ok
         const errorData = await response.json();
         console.error("Admin Login Error Response:", errorData);
        }
         
      }
      console.log(response);
    } catch (error) {
      console.log("Admin Login Process Failed",error);
    }
   }
return (
  
    <div className="row justify-content-center">
    <div className="col-12">
    <div className="card border-2 shadow-lg">
            
                <h1 style={{ color: 'blue'}}><i>Admin Panel</i></h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="mail"
                            value={admin.mail}
                            onChange={handleinput}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="pass"
                            value={admin.pass}
                            onChange={handleinput}
                            required
                             className="form-control"
                        />
                    </div>
                    
                    <button type="submit" className="admin-login-button m-3">Login</button>
                    <NavLink className="nav-link" to="/admin/adminregister"><u>Register Yourself As an Admin</u></NavLink>
                </form>
            </div>
        </div>
        </div>
        
    
);
}


export default AdminLogin;