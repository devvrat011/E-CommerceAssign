import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        let user = await User.findOne({ username });
        let check_email = await User.findOne({email});
        if (user || check_email) return res.status(400).json({ message: 'User already exists' });
        user = new User({ name, username,email, password });
        await user.save();
        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        let email = user;
        const check_email = await User.findOne({ email });
        if (!user && !check_email) return res.status(400).json({ message: 'Invalid credentials' });
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
            const token = jwt.sign(
                { id: user._id, isOwner: user.isOwner },
                process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = user._doc;
            res.status(200).json({ token, rest });
        }
        else{
            const isMatch1 = await bcrypt.compare(password, check_email.password);
            if (!isMatch1) return res.status(400).json({ message: 'Invalid credentials' });
            const token = jwt.sign(
                { id: check_email._id, isOwner: check_email.isOwner },
                process.env.JWT_SECRET
            );
            const { password: pass, ...rest } = check_email._doc;
            res.status(200).json({ token, rest });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
