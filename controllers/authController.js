import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError,UnAuthenticatedError } from '../errors/index.js';


const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values');
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use');
    }

    // Create a new user instance
    const newUser = new User({ name, email, password });
    
    // Save the new user to the database
    await newUser.save();

    // Assuming User.createJWT() creates and returns a JWT token
    const token =  newUser.createJWT();
    console.log(token)

    // Send response with user details and token
    res.status(StatusCodes.OK).json({
        user: {
            email: newUser.email,
            lastName: newUser.lastName,
            location: newUser.location,
            name: newUser.name,
            // Include other user properties as needed
        },
        token,
        location: newUser.location
    });
};

const login = async (req, res) => {
    const {email,password} = req.body
    if(!email || !password){
        throw new BadRequestError('please provide all values')
    }
    const users = await User.findOne({email}).select('password')
    if(!users){
        throw new UnAuthenticatedError('Invalid credentials')
    }
    const isPasswordCorrect = await users.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid credentials')
    }
    const token = users.createJWT()
    users.password = undefined  
    const user = await User.findOne({email})

    res.status(StatusCodes.OK).json({user,token,location: user.location}); 
};

const updateUser = async (req, res) => {
    const {email,name,lastName,location} = req.body
    if(!email || !name ||!lastName ||!location){
        throw new BadRequestError('please provide all values')
    }
    const user = await User.findOne({_id:req.user.userId});
    user.email =email
    user.name =name
    user.lastName =lastName       
    user.location =location
    await user.save()
    const token = user.createJWT()

    res.status(StatusCodes.OK).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            name: user.name,
        },
        token,
        location: user.location
    });
};

export default { register, login, updateUser };
