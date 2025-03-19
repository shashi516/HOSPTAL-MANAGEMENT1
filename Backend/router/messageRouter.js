import express from "express";
import { deleteMessage, GetAllMessages, sendmessage } from "../Controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router=express.Router();

router.post("/send",sendmessage);
router.get("/getall",isAdminAuthenticated,GetAllMessages);
router.delete("/delete/:id",isAdminAuthenticated,deleteMessage)

export default router;

