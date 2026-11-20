import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const UserChats= sequelize.define("UserChats",{
    UUID: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUID,
        allowNull: false
    },
    // ChatId: {
    //     type: DataTypes.STRING,
    // },
    Users: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
        allowNull: false
    },
    isGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            customValidator(value) {
                if(this.isGroup== true && value==null){
                    throw new Error("Group Name Required");
                }
            }
        }
    }
},{
    tableName: "userChats",
    timestamps: true
});

export default UserChats;