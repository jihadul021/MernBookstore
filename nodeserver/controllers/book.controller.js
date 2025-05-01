import AddBook from '../models/AddBook.model.js';

// Get book details with related books
export const getBookById = async (req, res) => {
    try {
        const book = await AddBook.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find related books (same category or author)
        const relatedBooks = await AddBook.find({
            _id: { $ne: book._id }, // exclude current book
            $or: [
                { category: { $in: book.category } },
                { author: book.author }
            ]
        }).limit(10);

        // Add related books to response
        const bookWithRelated = {
            ...book.toObject(),
            relatedBooks
        };

        res.status(200).json(bookWithRelated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
