import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        let responseData = {
            status: 401,
            message: "Unauthorized"
        }
        return res.status(401).json(responseData)
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, profile) => {
        if (err) {
            return res.status(403)
        }
        req.profile = profile
        console.log("User Authenticated")
        next()
    })
}

export default jwtAuth