import { Router } from "express";
import { addSchool, getSchools } from "../controller/school.controller.js";
const router = Router();

router.get("/listSchools", getSchools);
router.post("/addSchool", addSchool);
export default router;
