import { firestore } from "../../config/firebase";

export const readReceipt = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const messageId = req.params.messageId;
        const userId = req.body.userId;

        await firestore
            .collection("Conversations")
            .doc("Chats_" + chatId)
            .collection("Messages")
            .doc(messageId)
            .update({
                [`participants.${userId}.readReceipt`]: new Date()
            })

        res.status(200).json({ response: {}, message: "Successful!" });
    } catch (error) {
        console.log("..error..", error);
        res.status(500).json({ message: "Something Went Wrong!" })
    }
}