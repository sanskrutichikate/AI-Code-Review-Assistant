import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    try {

        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        // Check if token exists
        if (!authHeader) {
            return res.status(401).json({
                message: "Access Denied. No Token Provided."
            });
        }

        // Remove "Bearer " from token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user information
        req.user = decoded;

        // Continue to next function
        next();

    } catch (error) {
          console.error(error);

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};
export default authMiddleware;