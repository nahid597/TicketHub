import mongoose from 'mongoose';

interface UserAttrs {
    name: string,
    email: string,
    password: string
};

// An interface that describe the properties that a user model has
interface UserModel extends mongoose.Model <UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describe the properties that a user document has
interface UserDoc extends mongoose.Document{
    name: string,
    email: string,
    password: string
}


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User};