import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async(req:Request, res: Response)=>{
    try {
        console.log("Login User");
        const result = await authService.loginUserIntoDB(req.body);
    //     res.status(200).json({
    //   success: true,
    //   message: "Users retrived successfully!",
    //   data: result.rows,
    // });

    } catch (error:any) {
    res.status(500).json({
    success:false,
    message:error.message,
    error:error,
    })
    }

}
export const authController = {
    loginUser,
}