import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";
// import config from "../../config/index";

const loginUserIntoDB = async(payLoad:{email:string; password:string;})=>{
    const {email, password} = payLoad;
    //1. check if the user exists
    // 2. compare the password
    // 3. generate token

    const userData = await pool.query(`
         SELECT * FROM users WHERE email = $1
        `, [email]);

        if(userData.rows.length === 0){
            throw new Error("Invalid Credintials!");
        }
        const user = userData.rows[0];
        const matchPassword = await bcrypt.compare(password, user.password);
        console.log(matchPassword);
        if(!matchPassword){
        throw new Error("Invalid Credintials!");
        }
        // console.log(user);
        // Generate token
        const jwtpayload = {
            id: user.id,
            name:user.name,
            is_active:user.is_active,
            email:user.email
        };
        // const accessToken = jwt.sign(jwtpayload, config.secret,{expiresIn:"1d",});
        const accessToken = jwt.sign(jwtpayload, "fafa2gf1235a" as string,{expiresIn:"1d",});
        return accessToken;
        

}
export const authService ={
    loginUserIntoDB,
}