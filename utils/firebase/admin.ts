import firebaseAdmin from "../../config/firebaseAdmin";

export const verifyToken = async (token) => {
    // idToken comes from the client app
    const user = await firebaseAdmin.auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            return { ...decodedToken }
        })
        .catch((error) => {
            throw error
        });
    return user
}
