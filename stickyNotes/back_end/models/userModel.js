import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    age:{
     type:Number,
     required:true
    },
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
     type:String,
     required:true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
})


const UserModel = mongoose.model('user',userShema)

export default UserModel;