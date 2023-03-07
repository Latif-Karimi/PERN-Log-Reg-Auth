module.exports = (req,res,next)=>{
  // console.log(req.body);
    const {email,username,password} = req.body;
    
    function validEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    }
    if (req.path === "/register") {
      if (![email, username, password].every(Boolean)) {
        return res.status(401).json({ error: "Missing Credentials" });
      } else if (!validEmail(email)) {
        return res.status(401).json({ error: "Invalid Email" });
      }
      
      } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
          return res.status(401).json("Missing Credentials");
        } else if (!validEmail(email)) {
          return res.status(401).json("Invalid Email");
        }
      }
      
    next ()
}