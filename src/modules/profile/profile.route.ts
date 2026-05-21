import { Router } from "express";
import { profileController } from "./profile.controller";

// step 1
const router = Router();

router.post("/", profileController.createProfile);
export const profileRoute = router;