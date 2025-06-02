const Author = require('../models/Author');


exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!author) {
            return res.status(404).json({ message: 'Autor nie został znaleziony' });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};