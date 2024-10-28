import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from 'react-toastify';

function SignIn() {
  //Function use for Navigation
  const navigate = useNavigate(); 
  //Generating Token
  const {storeToken} = useAuth();
  //checking Token
  console.log(storeToken);
  //Initialize the user variable
    const [user,SetUser] = useState({
        mail:"",
        pass:""
    });
    //Function for HandleInput
    const handleinput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;

    SetUser({
        ...user,//Use Spread Operator to saving the Previous values 
        [name]:value
    });

    }
   //For Form Submission
   const handleSubmit =async (e)=>{
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login',{
       method:'POST',
       headers:{
        "Content-Type":"application/json"
       }
       ,
       body:JSON.stringify(user)

      });
      const res_data = await response.json();
      console.log("Response From Server for Signin: ",res_data);
      if(response.ok){
     
        storeToken(res_data.token);
        toast.success('Login Successfully');
        navigate('/')
      }
      else{
        if(res_data.msg){
          toast.error(res_data.msg);
        }else{
         // Handle error if response is not ok
         const errorData = await response.json();
         console.error("SignIn Error Response:", errorData);
        }
         
      }
      console.log(response);
    } catch (error) {
      console.log("Login Process Failed",error);
    }
   }
  return (
    <div>
      {/* Contact Form */}
      <section className="py-5">
        <div className="container bg-dark">
       
          <div className="row">
            <div className="col-md-6 mt-5 p-5">
              <form onSubmit={handleSubmit}>
             
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">Email address</label>
                  <input type="email" className="form-control" id="email" name="mail" value={user.mail} onChange={handleinput} required />
                </div>
             
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-white">Password</label>
                  <input type="password" className="form-control" id="password" name="pass" value={user.pass} onChange={handleinput}  required />
                </div>
                <button type="submit" className="btn btn-warning text-white">Sign In</button>
              </form>
            </div>
            <div className="col-md-6 p-2">
            
              <div className="mt-4">
               <img height={300} width={300} src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW58ZW58MHx8MHx8fDA%3D"/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignIn;
