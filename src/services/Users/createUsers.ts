import Users from "../../model/Users";
import {usersdata} from "../../testData/users"

export const createUsers= async(_req,res) =>{
    try {
        await Users.bulkCreate(usersdata);
        console.log("Users created!")
        res.status(201).json({message:"Created!"});
    } catch(error) {
        console.log("..error..",error);
        res.status(500).json({message:"Something Went Wrong!"})
    }
}