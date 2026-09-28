import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
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

        // 6. Store the user's ID in the request
        req.userId = decoded.id;

        // 7. Continue to the next middleware/controller
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