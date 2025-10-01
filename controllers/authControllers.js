import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
       
        try{
            const { name, username, email, password, role } = req.body;

            const existing = await User.findOne( { email});
            if(existing) return res.status(400).json({message:"Email already registered"});

            const hashedPassword = await bcrypt.hash(password,10);

            const user = await User.create({
                name,
                username,
                email,
                password: hashedPassword,
                role
            });
            console.log("Saved user:", user);
            res.status(201).json({message: `${role} account created successfully!`, user });

        } catch (error) {
            res.status(500).json({message:"Server error", error: error.message });

        }
    };

export const login = async (req, res) => {
    try{

        const { email, password, role } = req.body;
         
        const user = await User.findOne({ email, role });
        if(!user) return res.status(400).json({message: "Invalid credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d"});

        res.json({message: "Login successful", token, role: user.role });

    } catch (error) {
        res.status(500).json({message: "Server error ", error: error.message});

    }
};    
