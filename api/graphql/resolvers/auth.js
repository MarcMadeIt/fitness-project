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
        try {
            const checkUser = await Users.findOne({ username: userInput.username });
            if (checkUser) {
                throw new Error('Username already exists!');
            }

            const hashedPassword = await bcrypt.hash(userInput.password, 10);

            const user = new Users({
                username: userInput.username.toLowerCase(),
                password: hashedPassword,
            });

            const result = await user.save();

            return { ...result._doc, password: null };

        } catch (err) {
            throw new Error(err.message);
        }
    },

    login: async ({ username, password }, { req, res }) => {
        try {
            const user = await Users.findOne({ username: username.toLowerCase() });

            if (!user) {
                throw new Error('Wrong credentials');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Wrong credentials');
            }

            const token = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '3h' }
            );

            return { token };
        } catch (err) {
            console.error(err);
            throw new Error(err.message || 'Server error during login');
        }
    },


    logout: async (_, __, { res }) => {
        res.clearCookie('token');
        return 'User logged out successfully';
    },
}

export default authResolver;