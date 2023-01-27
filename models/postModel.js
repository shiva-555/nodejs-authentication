import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'userSchema'},
    isDeleted: {type: Boolean, default: false}
});

export default mongoose.model('Post', postSchema, 'Post');