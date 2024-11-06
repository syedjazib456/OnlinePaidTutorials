const adminmiddleware = async (req,res,next)=>{
try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;//req.user = Admindata

    if(!adminRole){
        return res.status(403).json({msg:'Access Denied, User is not Admin'});
    }
  
    next();//true
} catch (error) {
    next(error);
}
}
module.exports=adminmiddleware;