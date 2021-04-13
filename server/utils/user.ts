import jwt from "jsonwebtoken";

export const verifyJWT = (token) => {
    const user = jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return undefined
        }
        return payload
    })
    return user
}