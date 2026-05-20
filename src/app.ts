import express, { type Application, type Request, type Response } from 'express'

import { pool } from './db';
import { userRoute } from './modules/users/user.route';
const app :Application= express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

app.get('/', (req : Request, res : Response) => {
  res.send({'message': 'Express server', 'Author':'Mollika Computer'})
  console.log("home page console log")
});

//1 post api create a single user
app.use('/api/users', userRoute);

// get api get all users


// updated data
// put api


app.delete('/api/users/:id', async(req:Request, res:Response)=>{
  const {id} = req.params;
    try {
        const result = await pool.query(`
    DELETE FROM users WHERE id=$1
    `,[id],)
    if(result.rowCount === 0){
        res.status(404).json({
        success:false,
        message:"User Not Found!",
    })
    }
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Users deleted successfully!"
    });
    } catch (error:any) {
        res.status(500).json({
        success:false,
        message:error.message,
        error:error,
    });
    }
})

// get single data get api



export default app;