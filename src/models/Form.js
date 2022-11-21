import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      default: 'untitled form',
    },
    description: {
      type: String,
      default: null,
    },
    questions: {
      type: Array,
    },
    invites: {
      type: Array,
    },
    public: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  },
);

Schema.plugin(mongoosePaginate);

export default mongoose.model('Form', Schema);
