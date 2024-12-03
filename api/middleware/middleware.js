import jwt from "jsonwebtoken"

export const secureAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isLoggedIn = false;
        return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === '') {
        req.isLoggedIn = false;
        return next();
    }

    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        req.isLoggedIn = false;
        return next();
    }

    if (!decodedToken) {
        req.isLoggedIn = false;
        return next();
    }

    req.isLoggedIn = true;
    req.userId = decodedToken.userId;
    next();
}