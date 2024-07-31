import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.js";

const Members = sequelize.define(
    "members",
    {
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        borrow_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        },
    },
    {
        tableName: "members",
        timestamps: true,
    }
);

export default Members;
