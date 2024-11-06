
import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/Auth";
const baseURL = import.meta.env.VITE_API_URL;//localhost
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

function AdminList() {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]); // Corrected state naming
    const { authorizationtoken } = useAuth();
    
    const getAllAdminData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/admindetails', {
                method: 'GET',
                headers: {
                    Authorization: authorizationtoken,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setAdmins(data.msg); // Assuming data is an array of admins
            } else {
                toast.error(data.msg || 'Failed to fetch admins');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while fetching admin data');
        }
    };
    const handleDelete = async (id) => {
        // Optimistically update the state //UI updation then backend 
        // Optimistically" in the context of UI updates and programming refers to an approach where the application assumes 
        // that an action will succeed and updates the interface accordingly,
        // without waiting for confirmation from the server.
        setAdmins((prevAdmins) => prevAdmins.filter(admin => admin._id !== id));//103
        toast.error('Admin Deleted Successfully'); // Show success message
    
        try {
            const response = await fetch(`http://localhost:5000/api/admin/admindelete/${id}`, {//:adminid
                method: 'DELETE',
                headers: {
                    Authorization: authorizationtoken,
                },
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                // If the response isn't ok, roll back the optimistic update
                setAdmins((prevAdmins) => [...prevAdmins, { _id: id }]); // You may want to fetch the admin's full data
                toast.error(data.msg || 'Failed to delete admin'); // Show error message
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while deleting the admin');
            // Rollback optimistic update if necessary
            // setAdmins((prevAdmins) => [...prevAdmins, { _id: id }]); // This may need more info to restore the admin
        }
    };
    
    

    useEffect(() => {
        getAllAdminData();
    }, []);

    return (
        <div className="admin-list">
            <h2>Admin Details</h2>
            {admins.length === 0 ? (
                <p>No admin found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((curradmin,index) => (
                            <tr key={index}> {/* Use a unique key */}
                                <td>{curradmin.adminname}</td>
                                <td>{curradmin.adminemail}</td>
                                <td>
                                {/* //uploads\\asasj localhost*/}
                                    <img src={`${baseURL}/${curradmin.adminImage}`} alt={curradmin.adminname} className="admin-image" style={{ width: 100, height: 100 }} />
                                </td>
                                <td>
                                    <NavLink className="mx-4 btn btn-secondary" to={`/adminupdate/${curradmin._id}/edit`}>Edit</NavLink>
                                    <button className="mx-4 btn btn-danger" onClick={() => handleDelete(curradmin._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AdminList;
