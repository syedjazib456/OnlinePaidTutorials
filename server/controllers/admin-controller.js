//A List of Controllers
const Admin = require('../models/admin-model');//model
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const adminreg = async (req,res)=>{
    try{
        console.log("Incoming Data :",req.body);
        const {name,mail,pass} = req.body;//"Izhan","asjaksf"
        const AdminExist = await Admin.findOne({adminemail:mail});
        if(AdminExist){
         return  res.status(400).json({msg:"Email Already Exists"});//Not Found
        }
        const imagePath = req.file ? req.file.path : null;
        if (!imagePath) {
            return res.status(400).json({ msg: "Image file is required." });
        }
        console.log("Uploaded File:", req.file);
       const adminCreate = await Admin.create({
        adminname:name,
        adminemail:mail,
        adminpassword:pass,
        adminImage:imagePath
     })
    return res.status(201).json({
        msg:adminCreate,
        token:await adminCreate.generateToken(),
        adminId:adminCreate._id.toString()
    }); //User Created   
    
    }
    catch(error){
        console.error("Error during Admin registration:", error);
        if(error.name=='ValidationError'){
        return res.status(400).json({ msg: error.message });
        }
        return res.status(500).json({msg:"Internal Server Error"});
    }
}
const adminlog = async (req, res) => {
  try {
      const { mail, pass } = req.body;
      console.log("Incoming Login Data:", req.body);

      const AdminExist = await Admin.findOne({ adminemail: mail });
      console.log("Admin Exists:", AdminExist);

      if (!AdminExist) {
          return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const userMatch = await bcrypt.compare(pass, AdminExist.adminpassword);
      console.log("Password Match:", userMatch);

      if (userMatch) {
          const token = await AdminExist.generateToken();
          console.log("Generated Token:", token);
          return res.status(200).json({
              msg: "Login Successfully",
              token,
              userId: AdminExist._id.toString()
          });
      } else {
          return res.status(401).json({ msg: "Invalid Email or Password" });
      }
  } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
  }
}

const fetchadmin = async (req,res)=>{
    try {
  
      const response = await Admin.find();
  
      if(!response){
          return res.status(404).json({msg:"No Admin Found"});
      }
      res.status(200).json({msg:response});
    } catch (error) {
      console.log('Admin : '+error);
    }
  }
  const deleteAdmin = async (req,res)=>{
    try {
      const id = req.params.adminid;

     const response = await Admin.deleteOne({_id:id});
     
      if(response.deletedCount===0){
          return res.status(404).json({msg:"Admin Not Found"});
      }
      res.status(200).json({msg:"Admin Deleted Successfully"});
    } catch (error) {
      console.log('Admin : '+error);
    }
  }
  const getadminbyId = async (req,res)=>{
    try {
      const id = req.params.adminid;

     const response = await Admin.findOne({_id:id},{adminpassword:0});
     
     
      res.status(200).json({msg:response});
    } catch (error) {
      console.log('Admin : '+error);
    }
  }

  const updateadminbyId = async (req, res, next) => {
    try {
        const id = req.params.adminid;
        const updatedUserData = {
          name: req.body.name,
          mail: req.body.mail,
          pass: req.body.pass,
          // Add other fields as necessary
      };

        // Verify that the admin exists
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found." });
        }

        // Hash password if provided
        if (updatedUserData.pass) {
            const salt = await bcrypt.genSalt(10);
            updatedUserData.pass = await bcrypt.hash(updatedUserData.pass, salt);
        }

        const imagePath = req.file ? req.file.path : null;

        // Handle image deletion if a new image is uploaded
        if (imagePath) {
            const oldImagePath = path.join(__dirname, '..', admin.adminImage); // Use admin.image for the old image filename
            console.log("Old image path:", oldImagePath);

            fs.access(oldImagePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    fs.unlink(oldImagePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error("Failed to delete old image:", unlinkErr);
                        } else {
                            console.log("Old image deleted successfully.");
                        }
                    });
                } else {
                    console.warn("Old image does not exist, skipping deletion.");
                }
            });
            updatedUserData.adminname = updatedUserData.name;
            updatedUserData.adminemail = updatedUserData.mail;
            updatedUserData.adminpassword = updatedUserData.pass;
            updatedUserData.adminname = updatedUserData.name;
            updatedUserData.adminImage = imagePath; // Update with new image path
        }else{
            updatedUserData.adminname = updatedUserData.name;
            updatedUserData.adminemail = updatedUserData.mail;
            updatedUserData.adminpassword = updatedUserData.pass;
            updatedUserData.adminname = updatedUserData.name;
            updatedUserData.adminImage = admin.adminImage; 
        }

        const response = await Admin.updateOne({ _id: id }, { $set: updatedUserData });
        console.log("Update response:", response);

        if (response.nModified === 0) {
            return res.status(404).json({ msg: "Admin not found or no changes made." });
        }

        return res.status(200).json(updatedUserData);
    } catch (error) {
        console.error("Update error:", error);
        next(error);
    }
};

//check Admin web token logic 

const admintokencheck = async (req,res)=>{
try {
    const AdminData = req.user;
    console.log(AdminData);
    return res.status(200).json({AdminData});
} catch (error) {
    console.log(`Error from the Admin Route ${error}`);
}
}

module.exports = {adminreg,adminlog,admintokencheck,fetchadmin,deleteAdmin,getadminbyId,updateadminbyId};