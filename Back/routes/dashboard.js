const router = require ("express").Router();
 const pool = require ("../db");
 const authorization = require ("../middleware/authorization");

router.get("/", authorization, async (req,res)=>{
    try {
        //res.user has the payload
        // res.json(req.user);
        const user = await pool.query("SELECT username FROM users WHERE id = $1",[req.user])
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message)
        // res.status(500).json("Server Error");
        res.status(500).json({ message: "Server Error" });

        
    }
})

module.exports=router;