import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt.js";
import validator from "validator";


// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }
        const token = createToken(user._id)
        res.json({ success: true, token: token })
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" });
    }
}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {

    const { name, password, email } = req.body;

    try {
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ success: false, message: "User Already exist." })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password." })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = User({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({ success: true, token: token })
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error" })
    }
}

export { loginUser, registerUser }