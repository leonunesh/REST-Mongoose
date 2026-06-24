import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    default: null,
  },
  publishedYear: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BookSchema = mongoose.model('Book', bookSchema);

export class BookModel {
  async create(data) {
    const book = new BookSchema(data);
    return await book.save();
  }

  async findById(id) {
    return await BookSchema.findById(id);
  }

  async update(id, data) {
    return await BookSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    const result = await BookSchema.findByIdAndDelete(id);
    return result !== null;
  }

  async findAll() {
    return await BookSchema.find({});
  }
}
