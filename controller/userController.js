import mongoose from 'mongoose'
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.create({username, password});
        return res.status(201).json({status: 'success', data: user, message: 'successfully created'});
    } catch (err) {
        console.log(err);
        return res.status(500).json({status: 'failure', message: 'error occured', data: {}});
    }
};

const loginUser = async (req, res) => {
    try{
        const {username , password} = req.body

        const existing_user = await User.findOne({username: username});
        
        if(!existing_user){
            return res.status(404).send("first sign up");
        }

        const isPassword = await bcrypt.compare(password , existing_user.password)

        if(!isPassword){
            return res.status(400).send("you have entered the wrong password")
        }

        const token = jwt.sign({
            userId : existing_user._id.toString()
        },
        "my-secKey"
        );

        return res.status(201).send({status:true, data: token})
    } catch(err){
        console.log(err);
        return res.status(500).send(err)
    }
}


const getAllUser =async(req,res)=>{
    try{
        const {userName} = req.query
        const allUser = await User.find(req.query)
        return res.status(200).send({status:true, data: allUser})
         
    }catch(err){
       return res.status(500).send(err)
    }
}


const getuserById =async(req,res)=>{
    try{
        
        const getUserBYId = req.params.id  

        const userdatabyID = await User.findOne(getUserBYId)
      
        return res.staus(200).send({status:true, data:userdatabyID})

    }catch{
        return res.status(500).send(err)
    }
}


const UpdateUserByID = async(req,res)=>{
    try{
        const data = req.body
        const UpdataUser = req.params.id
        const canUpdateuser = await User.findByIdAndUpdate(UpdataUser, {$set:data}, {new:true})

        return res.status(200).send({status:true , data:canUpdateuser})

    }catch(err){
        return res.status(500).send(err)
    }
}


const DelUserUserById = async(req,res)=>{

    try{

        let DelUserID = req.params.id
    
        const canDeluser = await User.findById(DelUserID)
    
        const DeluserandUpdate = await User.findOneAndUpdate({_id : canDeluser, isDeleted:false}, {isDeleted:true, deletedAt:new Date()})
    
        return res.status(500).send({status:true, data: DeluserandUpdate})


    } catch(err) {
        return res.status(500).send(err)
    }

}




export default {createUser,loginUser,getAllUser,getuserById,UpdateUserByID,DelUserUserById}