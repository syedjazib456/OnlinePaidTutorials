import React,{useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_URL;
//About Axios VS Fetch API
// -- Speed: In most real-world applications, the difference in speed is negligible.
//           Both Axios and Fetch are efficient for making HTTP requests.
// -- Ease of Use: Axios is often favored for its ease of use, built-in features, 
//                 and better error handling, which can lead to quicker development times.
// -- Specific Needs: Depending on your project requirements (like browser support or specific features),
//                    one might be more suitable than the other.

// Key Differences
//Axios works on older browsers like internet explorer
//Fetch API works on modern browsers
//Axios: Automatically transforms JSON data and handles request/response transformations,
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";
import { toast } from 'react-toastify';
function AdminUpdate(){
    
    //Function use for Navigation
  const navigate = useNavigate(); 
  const params = useParams();
  //Generating Token
  const {storeAdminToken,authorizationtoken} = useAuth();
  //checking Token
  console.log(storeAdminToken);
  //Initialize the user variable
    const [admin,SetAdmin] = useState({
        name:"",
        mail:"",
        pass:"",
        image: null,
    });

    const getAdminDatabyId = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/update/${params.id}`, {
                method: 'GET',
                headers: {
                    Authorization: authorizationtoken,
                },
            });
            
            const data = await response.json();
           console.log();
            if (response.ok) {
               const fetchAdmin = data.msg; //adminname
                SetAdmin({
                    name: fetchAdmin.adminname || "",
                    mail: fetchAdmin.adminemail || "",
                    pass: "", // default password field
                    image:fetchAdmin.adminImage || "",
                }); // Assuming data is an array of admins
                console.log(data.msg);
            } else {
                toast.error(data.msg || 'Failed to fetch admins');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while fetching admin data');
        }
    };
    
    useEffect(()=>{
     getAdminDatabyId();
    //  console.log(admin);
    },[])


    //Function for HandleInput
    const handleinput = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    let files = e.target.files;
    if(name==='image'){
    SetAdmin({
      
        ...admin,//Use Spread Operator to saving the Previous values 
        image:files[0] || null
    });
  }
  else{
    SetAdmin({
      
      ...admin,//Use Spread Operator to saving the Previous values 
     [name]:value
  });
  }

    }
   //For Form Submission
   const handleSubmit =async (e)=>{
    e.preventDefault();
    // Yes, using FormData is essential when you want to send data as multipart/form-data,
    // especially when you're working with file uploads in a web application
    const formDataToSend = new FormData();
    formDataToSend.append('name', admin.name);
    formDataToSend.append('mail', admin.mail);
   

    if(admin.pass){
        formDataToSend.append('pass', admin.pass);
    }
    if (admin.image) {
        formDataToSend.append('image', admin.image);
    }

    console.log(admin);

    try {
      const response = await axios.patch(`http://localhost:5000/api/admin/updatedata/${params.id}`,formDataToSend,{
       
       headers:{
         Authorization: authorizationtoken,
        "Content-Type":"multipart/form-data"
        
       }
      

      });
      const res_data = await response.data;
      console.log("Response From Server for Admin Registeration: ",res_data);
      if(response.status===200){
        const { isAdmin } = res_data;
        // Store the user data (including isAdmin) in state or context
        localStorage.setItem('isAdmin', isAdmin);
        console.log(res_data);
        console.log(isAdmin);
        console.log("Form Data Being Sent:", Array.from(formDataToSend.entries()));

        toast.success('Updated Successfully');
        navigate('/adminlist')
      }
   
      console.log(response);
    } catch (error) {
     {
        const res_data = error.response.data; // Get the error response data
        const errorMsg = res_data.msg || "Updation Failed"; // Fallback message

        // Show the error toast
        toast.error(errorMsg);
        console.error("Admin Updation Error Response:", res_data);
    }
    }
   }
return (
  
    <div className="row justify-content-center">
    <div className="col-12">
    <div className="card border-2 shadow-lg">
            
                <h1 style={{ color: 'blue'}}><i>Update Admin</i></h1>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label htmlFor="email">Admin Name</label>
                        <input
                            type="text"
                            id="email"
                            name="name"
                            value={admin.name}
                            onChange={handleinput}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Admin Email</label>
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
                        <label htmlFor="password">Admin Profile</label>
                        <input
                            type="file"
                            id="password"
                            name="image"
                            accept="image/*"
                            onChange={handleinput}
                            
                             className="form-control"
                        />
                    </div>
                    {admin.image && <img src={typeof admin.image === 'string' ? `${baseURL}/${admin.image}` : URL.createObjectURL(admin.image)} width={100} height={100} alt="Preview" />}
                    <div className="form-group">
                        <label htmlFor="password">Admin Password</label>
                        <input
                            type="password"
                            id="password"
                            name="pass"
                            value={admin.pass}
                            onChange={handleinput}
                            className="form-control"
                        />
                    </div>
                    
                    <button type="submit" className="admin-login-button m-3">Update</button>
                    <NavLink></NavLink>
                </form>
            </div>
        </div>
        </div>
        
    
);
}


export default AdminUpdate;