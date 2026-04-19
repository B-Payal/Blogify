const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    role:{
        type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
    },
    permissions:{
        type:String , 
        enum:['read:posts', 'write:posts', 'delete:posts', 
           'read:users', 'write:users', 'manage:settings']
    }


})

userSchema.pre('save', async function () {
    try {
        if (!this.isModified('password')) {
            return;
        }

        this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        console.log(err);
    }
});


const User = mongoose.model('User' , userSchema)

module.exports=User;