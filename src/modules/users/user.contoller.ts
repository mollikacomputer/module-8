import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async(req:Request, res: Response)=>{
//   const {name, email, password, age} = req.body;
  
    const result = await userService.createUserIntoDB(req.body);
  res.status(201).json({
    success:true,
    message:"Create user successfully",
    data:result.rows[0],
  })
};

const getAllUsers = async(req:Request, res: Response)=>{
  try {
    const result = await userService.getAllUsersFromDb()
    res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows,
    })
  } catch (error: any) {
    res.status(500).json({
      success:false,
      message:error.message,
      error:error,
    })
  }
};

const getSingleUsers = async(req : Request, res : Response)=>{
    const {id} = req.params;

  try {
    const result = await userService.getSingleUserFromDB(id as string );

     if(result.rows.length === 0){
    res.status(404).json({
      success:false,
      message:"User not found",
      data:{},
    })
    }

      res.status(200).json({
      success: true,
      message: "Users retrived successfully!",
      data: result.rows[0],
    })
  } catch (error:any) {
      res.status(500).json({
      success:false,
      message:error.message,
      error:error,
    })
  }

};

const updateUser = async(req: Request, res:Response)=>{
  const {id} = req.params;
  // const {name, password, age, is_active} = req.body;
  // console.log({name, password, age, is_active});

  try {
   
    const result = await userService.updateUserFromDB(req.body, id as string);

      if(result.rows.length === 0){
         res.status(404).json({
        success:false,
        message:"User Not Found!",
        data:{},
    })
      };
      // console.log(result)
      res.status(200).json({
      success: true,
      message: "Users Updated successfully!",
      data: result.rows[0],
    });

  } catch (error:any){
      res.status(500).json({
      success:false,
      message:error.message,
      error:error,
    });
  }
};

export const userContoller = {
    createUser,
    getAllUsers,
    getSingleUsers,
    updateUser,
}