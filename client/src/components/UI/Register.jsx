import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from "react-toastify";



function Register() {
  const nav= useNavigate();
  
  // object destructuring
  const {storeToken} = useAuth();//token //consumer
  console.log(storeToken);
    const [user,SetUser] = useState({
        name:"",
        mail:"",
        pnum:"",
        pass:""
    });

    const handleinput=(e)=>{
    let name = e.target.name;
    let value = e.target.value;

    SetUser({
        ...user,
        [name]:value
    });
    }

    const handleSubmit = async (e)=>{
     e.preventDefault();
     console.log(user)

     try {
      const response = await fetch('http://localhost:5000/api/auth/register',{
        method:'POST',//Http Protocol
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(user)//JSON Form "name"-> name:""//"name","mail"
        
      })
      console.log(response); 
      const res_data = await response.json();
      console.log("Response From Server for Registration: ",res_data);//res_data from server
      if(response.ok){
       
        localStorage.setItem('token',res_data.token);
        // storeToken(res_data.token);//
        toast.success("Registered Successfully");
        nav('/');
      }
      else {
        // Handle error if response is not ok
        if(res_data.msg){
        toast.error(res_data.msg);
        }else{
        const errorData = await response.json();
        console.error("Register Error Response:", errorData);
        }
      
    }
     
    } catch (error) {
       console.log("Registeration Process Failed",error);
     }
 
    }
  return (
    <div>
      {/* Contact Form */}
      <section className="py-5">
        <div className="container bg-dark">
         
          <div className="row">
          <div className="col-md-6 mt-2">
            
             
              <div className="mt-1">
               
               <img width="400" height="400" className="rounded-circle" src="https://media.istockphoto.com/id/1303860322/vector/vector-illustration-register-now-speech-bubble-label.jpg?s=612x612&w=0&k=20&c=gOtVI0FayIfjaDVYL66XIbbMp1VXX_1Hsc8kFNKabAk="/>
              </div>
            </div>
            <div className="col-md-6 p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                
                  <label htmlFor="name" className="form-label text-white">Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={user.username} onChange={handleinput} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">Email address</label>
                  <input type="email" className="form-control" id="email" name="mail" value={user.email} onChange={handleinput} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label text-white">Contact</label>
                  <input type="text" className="form-control" id="subject" name="pnum" value={user.phonenumber} onChange={handleinput} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-white">Password</label>
                  <input type="password" className="form-control" id="subject" name="pass" value={user.password} onChange={handleinput} required />
                </div>
                <button type="submit" className="btn btn-warning text-white">Register</button>
              </form>
            </div>
         
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
