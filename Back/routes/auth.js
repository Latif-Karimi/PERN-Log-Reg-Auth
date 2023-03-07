const router = require ("express").Router();
const pool = require ("../db");
const bcrypt = require ("bcrypt");
const jwtGenerate = require ("../utils/jwtGenerate")
const validInfo = require ("../middleware/validInfo")
const authorization = require ("../middleware/authorization")


//Register

router.post("/register", validInfo, async (req,res)=>{
    try {
        //1. destracture the req.body (name, email,password)

        const {username,email,password} = req.body

        //2. check if user exist (if user exist the throw error)
        const user = await pool.query ("SELECT * FROM users WHERE email = $1",[email])
        if (user.rows.length !== 0){
            return res.status(401).json("User already exist!");
        }        
        //3. Bcrypt the user password
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password,salt);
        //4. Enter the new user inside our database
            const newUser = await pool.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",[username,email,bcryptPassword])
            // res.json(newUser.rows[0]);
            //5. genrating our jwt token
            const token = jwtGenerate(newUser.rows[0].id);
            res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
      
    } 
});

//Login Route
router.post("/login",validInfo, async(req,res)=>{
    try {
        //1. destracture the req.body
        const {email,password} = req.body;
        //2. check if user is exist (if not then we throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(user.rows.length === 0){
            return res.status(401).json("Incorect Email or Password")
        }
        //3. check if incoming password is the same the databse password
        const validPassword =await bcrypt.compare(password,user.rows[0].password);
        if (!validPassword){
            return res.status(401).json("Incorect Password or Email")    
        }
        //4. give them the jwt toekn
        const token = jwtGenerate(user.rows[0].id);
        res.json({token});

    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error");
        
    }
});

router.get("/is-verify",authorization, async (req,res)=>{
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message)
        res.status(500).json("Server Error");
        
    }
})

module.exports=router;