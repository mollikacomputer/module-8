import bcrypt from "bcryptjs";
import { pool } from "../../db";

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
        
}
export const authService ={
    loginUserIntoDB,
}