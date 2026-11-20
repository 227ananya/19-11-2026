import * as express from "express";
import { createUsers } from "./Users/createUsers";
import { createChat } from "./Chats/createChat";
import { getChats } from "./Chats/getChats";
import { getUsers } from "./Users/getUsers";
import { sendMessages } from "./Messages/sendMessages";
import { getMessages } from "./Messages/getMessages";
import { readReceipt } from "./Messages/readReceipt";
import { updateLastSeenMessages } from "./Messages/updateLastSeenMessage";

const router= express.Router();

router.post("/users",createUsers);
router.get("/users",getUsers);

router.post("/chat/create",createChat);
router.get("/chat/:userid",getChats);

router.post("/chat/:chatId/message/send",sendMessages);
router.get("/chat/:chatId/message",getMessages);

router.post("/chat/:chatId/message/:messageId/read",readReceipt);
router.post("/chat/:chatId/lastseen",updateLastSeenMessages);



export default router;