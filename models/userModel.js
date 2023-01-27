import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.password) {
        const hash = await bcrypt.hash(user.password, 12);
        user.password = hash;
    }

    next();
});

export default mongoose.model('User', userSchema, 'User');