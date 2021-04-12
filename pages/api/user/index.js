import nextConnect from 'next-connect';
import connectDB from '../../../server/middleware/database';
import UserModel from "../../../server/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const handler = nextConnect();

handler.use(connectDB());

// Get Books for User

// Create New User
handler.post(async (req, res) => {
    let authData = req.body;
    if (authData.signUp) {
        signUpUser(authData)
            .then(responseData => {
                res.status(responseData.status).json({
                    ...responseData
                })
            })
            .catch(err => console.log(err))
    } else {
        signInUser(authData)
            .then(responseData => {
                res.status(responseData.status).json({
                    ...responseData
                })
            })
            .catch(err => console.log(err))
    }

})


// Edit User
handler.patch(async (req, res) => {
    res.status(200).send("Hello world");
})


// Delete User
handler.delete(async (req, res) => {
    res.status(200).send("Hello world");
})


export default handler;


// Utils

async function signUpUser(authData) {
    let responseData = {}

    // Check if User Already Exists

    let retrievedUser = await UserModel.findOne({
        email: authData.email
    }, (err, result) => {
        if (!result) {
            return null
        }
    });

    if (retrievedUser) {
        responseData = {
            status: 409,
            message: "This email is already in use"
        }
        return responseData
    }

    // Save New User
    let hashedPassword = bcrypt.hashSync(authData.password, 12);
    let newUser = new UserModel({
        ...authData,
        password: hashedPassword
    });

    responseData = await newUser.save()
        .then(user => {
            const payload = {
                email: user.email,
                password: user.password
            }
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);
            const userResponse = ({ ...user._doc })
            delete userResponse.password;
            return {
                status: 201,
                message: `Welcome to the Book Nook ${user.username}!`,
                token: jwtToken,
                user: userResponse
            }
        })
        .catch(err => {
            if (err) {
                console.error(err);
                return {
                    status: 400,
                    message: "There is an error saving this user"
                }
            }
        });

    return responseData
}

async function signInUser(authData) {
    let responseData = {}

    const retrievedUser = await UserModel.findOne({
        email: authData.email
    }, (err, result) => {
        if (!result) {
            return null
        }
    });

    // No User Found
    if (!retrievedUser) {
        responseData = {
            status: 401,
            message: "Incorrect Credentials"
        }
        return responseData
    }


    // Authenticate User
    responseData = await bcrypt
        .compare(authData.password, retrievedUser.password)
        .then(doMatch => {
            if (doMatch) {
                const payload = {
                    email: retrievedUser.email,
                    password: retrievedUser.password
                }
                const jwtToken = jwt.sign(payload, process.env.JWT_SECRET);

                const userResponse = ({ ...retrievedUser._doc })
                delete userResponse.password;
                return {
                    status: 200,
                    message: `Welcome back ${retrievedUser.username}`,
                    token: jwtToken,
                    user: userResponse
                }
            }

            // Password Doesn't Match
            return {
                status: 401,
                message: "Incorrect Credentials"
            }

        })
        .catch(err => {
            console.log(err)
        })
    return responseData
}
