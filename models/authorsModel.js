import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthYear: {
    type: Number,
    default: null,
  },
  nationality: {
    type: String,
    default: null,
  },
  biography: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AuthorSchema = mongoose.model('Author', authorSchema);

export class AuthorModel {
  async create(data) {
    const author = new AuthorSchema(data);
    return await author.save();
  }

  async findById(id) {
    return await AuthorSchema.findById(id);
  }

  async update(id, data) {
    return await AuthorSchema.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    const result = await AuthorSchema.findByIdAndDelete(id);
    return result !== null;
  }

  async findAll() {
    return await AuthorSchema.find({});
  }
}
