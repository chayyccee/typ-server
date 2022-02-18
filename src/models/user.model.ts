import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

userSchema.pre<UserDocument>('save', async function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) : Promise<boolean> {
    const user = this as UserDocument;
    return await bcrypt.compare(candidatePassword, user.password)
    .catch((error: any) => false);
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
