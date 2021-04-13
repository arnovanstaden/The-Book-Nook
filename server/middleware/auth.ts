import jwt from "jsonwebtoken";
import { verifyJWT } from "../utils/user";

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
    const user = verifyJWT(token);
    if (!user) {
        let responseData = {
            status: 401,
            message: "Unauthorized"
        }
        return res.status(401).json(responseData)
    }
    req.user = user;
    console.log("User Authenticated")
    next()
}

export default jwtAuth