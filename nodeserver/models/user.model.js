import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
        },
        gender: {
            type: String,
            enum: ['male', 'female'],
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        profilePicture: {
            type: String,
        }
    }, 
    { timestamps: true }
);

const User = mongoose.model("UserTable", UserSchema);
export default User;