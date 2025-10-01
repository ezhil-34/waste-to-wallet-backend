import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique:true },
    email: { type: String, required: true, lowercase: true},
    password: { type: String, required: true},
    role: { type: String, enum: ["Citizen" , "Collector"], required: true},
}, {timestamps: true });

export default mongoose.model("User", userSchema);