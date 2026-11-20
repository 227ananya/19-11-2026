import { firestore } from "../../config/firebase";

export const getMessages = async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const limit = req.query.limit ? req.query.limit : 20
        const data = await firestore
            .collection("Conversations")
            .doc("Chats_" + chatId)
            .collection("Messages")
            .orderBy("createdAt", "desc")
            .limit(parseInt(limit))
            .get()
        const messages = data.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json({ response: messages, message: "Successful!" });
    } catch (error) {
        console.log("..error..", error);
        res.status(500).json({ message: "Something Went Wrong!" })
    }
}