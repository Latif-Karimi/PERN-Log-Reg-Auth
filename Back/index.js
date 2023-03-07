const express = require ("express");
const app = express ();
const cors = require ("cors");

//middleware
app.use(cors());
app.use(express.json()) // req.body

//Routes
//Dashboard
app.use("/dashboard",require("./routes/dashboard"));
//Register/login
app.use("/auth",require("./routes/auth"));


app.listen (3333,()=> {
    console.log ("server is runing port 3333")
})