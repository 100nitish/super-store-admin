const adminMiddleware = async (req, res, next) => {
    try {
        // Check if userType exists and is "Admin"
        if (req.user && req.user.userType === "Admin") {
            // User is admin, proceed with the response
            res.status(200).json({ msg: req.user });
        } else {
            // User is not admin, return 403 Forbidden
            res.status(403).json({ error: "Access forbidden: Admins only" });
        }
    } catch (error) {
        next(error); 
    }
};

module.exports = adminMiddleware;
