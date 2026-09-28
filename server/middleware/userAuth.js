import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userAuth = async (req, res, next) => {
    try {
        // 1. Get the Authorization header
        const authHeader = req.headers.authorization;

        // 2. Check whether the header exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // 3. Check whether it follows: Bearer <token>
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication format",
            });
        }

        // 4. Extract the JWT token
        const token = authHeader.split(" ")[1];

        // 5. Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.id;

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.userName = user.name;

        next();

    } catch (error) {
        console.error("User Authentication Error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default userAuth;