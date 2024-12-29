export default function isAuth (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({ message: "You are not authorized to perform this action." });
    }
}