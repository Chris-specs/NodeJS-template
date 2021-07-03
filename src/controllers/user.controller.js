import User from '../models/user.model';
import bcryptjs from 'bcryptjs';

/**
 *  CREATE USER
 */
export const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // CREATE NEW USER
        const newUser = new User(req.body);

        if (!newUser.password) {
            res.status(400).json({
                code: 400,
                status: 'Error',
                errors: [
                    {
                        field: 'password',
                        type: 'required',
                        message: 'Path `password` is required.',
                    },
                ],
            });
            return;
        }
        // HASH PASSWORD
        const salt = await bcryptjs.genSalt(10);

        newUser.password = await bcryptjs.hash(password, salt);

        // SAVE IN DB
        await newUser.save();

        // RESPONSE
        res.status(201).json({
            code: 201,
            status: 'Success',
            message: 'User created success',
        });
    } catch (error) {
        console.log(error);
        // VALIDATE IF THE USER DOESN'T EXIST
        if (error.name === 'MongoError') {
            res.status(400).json({
                code: 400,
                status: 'Error',
                message: 'This email is already registered',
            });
            return;
        }

        // IN CASE OF ERROR CREATE AN ARRAY WITH THE ERRORS
        const response = Object.values(error.errors).map((e) => {
            return {
                field: e.path,
                type: e.kind,
                message: e.message,
            };
        });

        // ERROR RESPONSE
        res.status(400).json({
            code: 400,
            status: 'Error',
            errors: response,
        });
    }
};

/**
 *  GET USERS
 */
export const getUsers = async (req, res) => {
    const response = await User.find();
    res.status(200).json({
        code: 200,
        status: 'Success',
        data: response,
    });
};

/**
 *  UPDATE USER
 */
export const updateUser = async (req, res) => {
    const response = await User.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
    });
    if (response === null) {
        res.status(404).json({
            code: 404,
            status: 'Not Found',
            message: 'User has not exist',
        });
        return
    }
    res.status(200).json({
        code: 200,
        status: 'Success',
        data: response,
    });
};

/**
 *  DELETE USER
 */
export const deleteUser = async (req, res) => {
    const response = await User.findByIdAndDelete(req.body._id);
    if (response === null) {
        res.status(200).json({
            code: 200,
            status: 'Success',
            message: 'User has not exist',
        });
        return
    }
    res.status(200).json({
        code: 200,
        status: 'Success',
        message: 'User deleted',
        data: response,
    });
};
