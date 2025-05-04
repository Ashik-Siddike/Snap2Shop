import { Schema, model, Document, Types } from 'mongoose';

export interface ISearchHistory extends Document {
  userId: Types.ObjectId;
  imageUrl: string;
  results: Types.ObjectId[];
  searchDate: Date;
}

const searchHistorySchema = new Schema<ISearchHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  results: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  searchDate: {
    type: Date,
    default: Date.now
  }
});

export default model<ISearchHistory>('SearchHistory', searchHistorySchema); 