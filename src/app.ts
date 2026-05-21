import express, { type Application, type Request, type Response } from 'express'

import { pool } from './db';
import { userRoute } from './modules/users/user.route';
import { profileRoute } from './modules/profile/profile.route';
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

app.use('/api/profile', profileRoute);

export default app;