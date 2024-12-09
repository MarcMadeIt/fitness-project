import jwt from 'jsonwebtoken';

export const secureAuth = (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } else if (req.get("Authorization")) {
        const authHeader = req.get("Authorization");
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        req.isLoggedIn = false;
        return next();
    }

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decodedToken.userId;
        req.username = decodedToken.username;
        req.isLoggedIn = true;

        return next();
    } catch (err) {
        req.isLoggedIn = false;
        return next();
    }
};
