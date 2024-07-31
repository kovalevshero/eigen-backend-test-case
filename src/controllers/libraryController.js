import dayjs from 'dayjs';
import Books from '../models/books.js';
import Members from '../models/members.js';
import BorrowedBooks from '../models/borrowed_books.js';
import { Op } from "sequelize";

BorrowedBooks.belongsTo(Members, { foreignKey: 'members_code', targetKey: 'code' });
Members.hasMany(BorrowedBooks, { foreignKey: 'members_code', sourceKey: 'code' });

export const borrowBook = async (req, res) => {
    try {
        const { book_code, member_code } = req.body;

        const book = await Books.findOne({
            where: {
                code: book_code
            }
        });

        if (!book) return res.status(400).json({ message: 'Book not found' });

        const member = await Members.findOne({
            where: {
                code: member_code
            }
        });

        if (!member) return res.status(400).json({ message: 'Member not found' });

        // Check book's availability
        if (!book.stock) return res.status(400).json({ message: 'Book is not available' });

        if (member.penalized_until && member.penalized_until < dayjs()) {
            return res.status(400).json({
                message: `Member is currently being penalized until 
                    ${dayjs(member.penalized_until).format('DD/MM/YYYY')}`
            });
        }

        if (member.borrow_count >= 2) {
            return res.status(400).json({
                message: 'Member cannot borrow more than 2 books'
            });
        }

        await member.increment('borrow_count', { by: 1 });
        await book.increment('stock', { by: -1 });
        await BorrowedBooks.create({
            books_code: book.code,
            members_code: member.code
        });

        res.status(200).json({ message: 'Successfully borrowed book' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const returnBook = async (req, res) => {
    try {
        const { book_code, member_code } = req.body;

        const book = await Books.findOne({
            where: {
                code: book_code
            }
        });

        if (!book) return res.status(400).json({ message: 'Book not found' });

        const member = await Members.findOne({
            where: {
                code: member_code
            }
        });

        if (!member) return res.status(400).json({ message: 'Member not found' });

        const borrowedBook = await BorrowedBooks.findOne({
            where: {
                books_code: book_code,
                members_code: member_code
            }
        });

        if (!borrowedBook) {
            return res.status(400).json({
                message: 'There is no book being borrowed'
            });
        }

        if (dayjs(borrowedBook.created_at).add(7, 'day') > dayjs()) {
            member.update({
                penalized_until: dayjs().add(3, 'day')
            });
        }

        await borrowedBook.destroy();
        await member.increment('borrow_count', { by: -1 });
        await book.increment('stock', { by: 1 });

        res.status(200).json({ message: 'Successfully returned book' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const showBooks = async (req, res) => {
    try {
        const books = await Books.findAll({
            where: {
                stock: {
                    [Op.gt]: 0
                }
            }
        });

        res.status(200).json({ message: 'Successfully retrieve books', data: books });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}

export const showMembers = async (req, res) => {
    try {
        const members = await Members.findAll({
            include: {
                model: BorrowedBooks,
                attributes: ['books_code', 'members_code'],
                where: {
                    deleted_at: null
                },
                required: false
            },
        });

        res.status(200).json({ message: 'Successfully retrieve books', data: members });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}