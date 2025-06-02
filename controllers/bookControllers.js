const Book = require('../models/Book');

// GET /api/books - lista książek z informacją o autorze
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/books - dodanie książki
exports.createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        const savedBook = await book.save();
        const populatedBook = await Book.findById(savedBook._id).populate('author');
        res.status(201).json(populatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/books/:id - usunięcie książki
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Książka nie została znaleziona' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};