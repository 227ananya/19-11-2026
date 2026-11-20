import { Op } from "sequelize";
import { firestore } from "../../config/firebase";
import UserChats from "../../model/UserChats";
import Users from "../../model/Users";

export const sendMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const participants = await UserChats.findOne({
            attributes: ["Users"],
            where: {
                "UUID": chatId
            }
        })
        const userNames = await Users.findAll({
            where: {
                UUID: {
                    [Op.in]: participants["Users"].filter(e => e != req.body.senderId)
                }
            }
        })
        await firestore
            .collection("Conversations")
            .doc("Chats_" + chatId)
            .collection("Messages")
            .doc()
            .set({
                "senderId": req.body.senderId,
                "participants": Object.fromEntries(
                    userNames.map((each) => [
                        each["UUID"],
                        {
                            names: each["name"],
                            lastSeen: "",
                            readReceipt: ""
                        }
                    ])
                ),
                "message": req.body.message,
                "createdAt": new Date()
            }, { merge: true });
        res.status(201).json({ response: {}, message: "Successful!" });
    } catch (error) {
        console.log("..error..", error);
        res.status(500).json({ message: "Something Went Wrong!" })
    }
}