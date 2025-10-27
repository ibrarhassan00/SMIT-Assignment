import UserModel from "../models/userModel.js";

export const userRegister = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;

        if (!name || !age || !email || !password) {
            return res.json({
                status: false,
                message: "Required Field Are Missing"
            })
        }

        const isUserExist = await UserModel.find({ email });

        if (isUserExist) {
            return res.json({
                status: false,
                message: "Email Already Exist"
            })
        }

        const user = await UserModel.create(req.body);
        res.json({
            status: true,
            message: "User Created",
            data: user
        })
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }



}


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({
                status: false,
                message: "Required Field Are Missing"
            })
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({
                status: false,
                message: "Email Password Invalid"
            })
        }

        if (user.password == password) {
            return res.json({
                status: true,
                message: "User Successfully Login" ,
                data: user
            })
        } else {
            return res.json({
                status: false,
                message: "Email Password Invalid"
            })
        }
        
    } catch (error) {
        res.json({
            status: false,
            message: error.message
        })
    }



}