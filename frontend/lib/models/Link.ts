import mongoose from 'mongoose';

export interface ILink extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  title: string;
  url: string;
  position: number;
  is_active: boolean;
  icon: string;
  created_at: Date;
  updated_at: Date;
}

const LinkSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Link title is required'],
    trim: true,
    maxlength: [100, 'Title must be less than 100 characters'],
  },
  url: {
    type: String,
    required: [true, 'URL is required'],
    trim: true,
    validate: {
      validator: function(v: string) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'URL must be a valid HTTP or HTTPS URL'
    }
  },
  position: {
    type: Number,
    required: true,
    default: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: '',
    trim: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// Compound index for user_id and position for efficient sorting
LinkSchema.index({ user_id: 1, position: 1 });
LinkSchema.index({ user_id: 1, is_active: 1 });

export default mongoose.models.Link || mongoose.model<ILink>('Link', LinkSchema);