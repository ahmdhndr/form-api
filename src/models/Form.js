import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import Answer from './Answer.js';

const Schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      default: 'Untitled form',
    },
    description: {
      type: String,
      default: 'Form description',
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

Schema.virtual('answers', {
  ref: Answer,
  localField: '_id',
  foreignField: 'formId',
});

export default mongoose.model('Form', Schema);
