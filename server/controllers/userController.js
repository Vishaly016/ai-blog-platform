import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Blog from "../models/Blog.js";


// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: normalizedName,
            email: normalizedEmail,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Register User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while registering user",
        });
    }
};

// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check whether email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // 2. Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 3. Compare the entered password with the stored bcrypt hash
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 4. Create a JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 5. Send successful login response
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while logging in",
        });
    }
};

const toggleBookmark = async (req, res) => {
    try {
        const { blogId } = req.params;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const alreadyBookmarked = user.bookmarks.some(
            (id) => id.toString() === blogId.toString()
        );

        if (alreadyBookmarked) {
            user.bookmarks.pull(blogId);
        } else {
            user.bookmarks.addToSet(blogId);
        }

        await user.save();

        return res.status(200).json({
            success: true,
            bookmarked: !alreadyBookmarked,
        });

    } catch (error) {
        console.error("Toggle Bookmark Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            bookmarks: (user.bookmarks || []).map(
                bookmark => bookmark.toString()
            ), 
        });

    } catch (error) {
        console.error("Get Bookmarks Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export {
    registerUser,
    loginUser,
    toggleBookmark,
    getBookmarks,
};