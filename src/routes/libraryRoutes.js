import express from "express";
import {
    borrowBook,
    returnBook,
    showBooks,
    showMembers
} from "../controllers/libraryController.js";

const router = express.Router();

const libraryRoutes = () => {
    /**
     * @swagger
     * components:
     *   schemas:
     *     BorrowRequest:
     *       type: object
     *       required:
     *         - book_code
     *         - member_code
     *       properties:
     *         book_code:
     *           type: string
     *           description: The code of the book to borrow
     *         member_code:
     *           type: string
     *           description: The code of the member borrowing the book
     *       example:
     *         book_code: "JK-45"
     *         member_code: "M001"
    */

    /**
     * @swagger
     * /api/v1/library/borrow:
     *   post:
     *     summary: Borrow a book
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/BorrowRequest'
     *     responses:
     *       200:
     *         description: Successfully borrowed a book
     *       400:
     *         description: Bad request
    */
    router.post("/borrow", borrowBook);

    /**
     * @swagger
     * components:
     *   schemas:
     *     ReturnRequest:
     *       type: object
     *       required:
     *         - book_code
     *         - member_code
     *       properties:
     *         book_code:
     *           type: string
     *           description: The code of the book to return
     *         member_code:
     *           type: string
     *           description: The code of the member returning the book
     *       example:
     *         book_code: "JK-45"
     *         member_code: "M001"
    */

    /**
     * @swagger
     * /api/v1/library/return:
     *   post:
     *     summary: Return a borrowed book
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ReturnRequest'
     *     responses:
     *       200:
     *         description: Successfully returned a book
     *       400:
     *         description: Bad request
    */
    router.post("/return", returnBook);

    /**
     * @swagger
     * /api/v1/library/books:
     *   get:
     *     summary: Retrieve a list of books
     *     responses:
     *       200:
     *         description: A list of books
    */
    router.get("/books", showBooks);

    /**
     * @swagger
     * /api/v1/library/members:
     *   get:
     *     summary: Retrieve a list of members
     *     responses:
     *       200:
     *         description: A list of members
    */
    router.get("/members", showMembers);

    return router
}

export default libraryRoutes;