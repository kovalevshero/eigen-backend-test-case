import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.js";
import Members from "./members.js";
import Books from "./books.js";

const BorrowedBooks = sequelize.define(
    "borrowed_books",
    {
        books_code: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Books,
                key: 'code'
            }
        },
        members_code: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Members,
                key: 'code'
            }
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
        deletedAt: {
            type: DataTypes.DATE,
            field: 'deleted_at',
        },
    },
    {
        tableName: "borrowed_books",
        timestamps: true,
        paranoid: true
    }
);

export default BorrowedBooks;
