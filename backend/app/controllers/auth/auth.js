import bcrypt from "bcryptjs";
import { User } from "../../models/index.js";
import { handleError, handleResponse, signToken } from "../../utils/index.js";
import { loginValidation, registerValidation } from "./validator.js";

export const register = async (req, res) => {
    try {
        const { error } = registerValidation.validate(req.body);
        if (error) return handleResponse(res, 400, error.details[0].message);

        const { name, email, password, mobile } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return handleResponse(res, 400, "User already exists");

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashed, mobile,  role: 'user' });

        const token = signToken({ id: newUser._id });

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        return handleResponse(res, 201, "Registered and logged in successfully. Welcome email sent.", {
            token,
            user: userWithoutPassword,
        });
    } catch (err) {
        return handleError(res, err);
    }
};

export const login = async (req, res) => {
    try {
        const { error } = loginValidation.validate(req.body);
        if (error) return handleResponse(res, 400, error.details[0].message);

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return handleResponse(res, 400, "Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return handleResponse(res, 400, "Invalid credentials");

        const token = signToken({ id: user._id });
        return handleResponse(res, 200, "Login successful", { token, role: user.role });
    } catch (err) {
        return handleError(res, err);
    }
};

export const me = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        return handleResponse(res, 200, 'user data fetched successfully', user);

    } catch (error) {
        return handleError(res, error);
    }
};