import jwt from "jsonwebtoken";

export const secureAuth = (req, res, next) => {
    let token;

    if (req.get("Authorization")) {
        const authHeader = req.get("Authorization");
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        console.log("No token found");
        req.userId = null;
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        req.username = decodedToken.username;
        return next();
    } catch (err) {
        console.error("Token verification failed:", err.message);
        req.userId = null;
        return next();
    }
};