import { express } from "express";
import { jwt } from "jsonwebtoken";
const router = express.Router();
router.post("/signup",(req,res)=>{
    const {username, email, password}=req.body;

    res.send("signup");
})

router.post("/login",(req,res)=>{
    const { email, password}=req.body;
    res.send("login");

})