import { Router } from "express";
import { userContoller } from "./user.contoller";


const router = Router()

router.post('/', userContoller.createUser);

router.get('/', userContoller.getAllUsers);

router.get('/:id', userContoller.getSingleUsers);

export const userRoute = router;