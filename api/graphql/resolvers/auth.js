import Users from "../../models/Users.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const authResolver = {

    getUsers: async () => {
        try {
            const getUsers = await Users.find();

            return getUsers;
        } catch (err) {
            throw err;
        }
    },

    createUser: async ({ userInput }) => {
        const checkUser = await Users.findOne({ username: userInput.username });

        if (checkUser) {
            throw new Error('Username is already exist!')
        }

        try {
            const hashedpassword = await bcrypt.hash(userInput.password, 10)

            const user = new Users({
                username: userInput.username,
                password: hashedpassword,
            });

            const result = await user.save();

            return { ...result._doc, password: null };

        } catch (err) {
            console.log(err)
        }
    },

    login: async ({ username, password }) => {
        try {
            const user = await Users.findOne({ username: username });

            if (!user) {
                throw new Error('User does not exist!')
            }

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) {
                throw new Error('Wrong password, try again! Good luck!')
            }

            const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return { userId: user.id, token: token, tokenExpiration: 1 };

        } catch (err) {

        }
    }
}

export default authResolver;