import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import  jwt  from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
    name:{type:String ,
        required: [true , 'please provide name'],
        minlength:3,
        maxlength:20,
        trim: true,
    },


    email:
        {type:String , required: [true , 'please provide email'],
        validate:{
            validator: validator.isEmail,
                message:'please provide a valide email'
            },
       
        unique: true,  
        },  
    

    password: {
        type:String , required: [true , 'please provide password'],
        minlength:6,
        select:false,

        
    },
    lastName: {
        type:String , 
        maxlength:20,
        trim: true,
        default:'lastName',
    },

    location: {type:String , 
        maxlength:20,
        trim: true,
        default:'my-city',
        },

})

UserSchema.pre('save',async function() {
    // console.log(this.modifiedPaths())
    if(!this.isModified('password')) return
     const salt=await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt)
    
})
UserSchema.methods.createJWT = function (){
    return jwt.sign({ userId:this._id}, "kbPeShVmYq3s6v9y$B&E)H@McQfTjWnZ" , { expiresIn :"7d" })
}
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password);
    return isMatch
}

const User = mongoose.model('User', UserSchema); 
export default User;