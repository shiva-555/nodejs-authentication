import mongoose from 'mongoose'

import Post from "../models/postModel.js"


const createPost = async (req, res) => {
    try {
        const {title, body} = req.body;
        console.log(req.body);
        const userId = mongoose.Types.ObjectId(req.body.userId);
        const PostData = await Post.create({title, body, userId});
        return res.status(201).send({status:true, data: PostData});
    } catch(err) {
        console.log(err);
        res.status(500).send(err)
    }
}

const getAllpost = async (req, res) => {
    try{
        const {postTitle} = req.query
        const {id} = req.params;

        const AllPost = await Post.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'User',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $project: {
                    title: 1, 
                    body: 1,
                    createdBy: '$user.username',
                    createdById: '$user._id'
                }
            }
        ]);
        return res.status(200).send({status: true, data: AllPost})
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}


const getPostById =async(req,res)=>{

    try{

        let PostId = req.params.id
    
        const cangetPostbyID = await Post.find({PostId:PostId})
    
        return res.status(200).send({staus:true, data:cangetPostbyID})
    }catch(err){
        return res.status(500).send(err)
    }
}


const updatePostById =async(req,res)=>{
    try{

        let data = req.body
        let updatePost = req.params.id
    
        const canUpdatePost = await Post.findByIdAndUpdate(updatePost, {$set:data},{new:true})
    
        return res.status(200).send({status:true, data:canUpdatePost})

    }catch(err){
        return res.status(500).send(err)
    }

}

const DelPostById = async(req,res)=>{

    try{

        let DelPostID = req.params.id
    
        const canDelPost = await Post.findById(DelPostID);
        
        if (req.userId !== canDelPost.userId.toString()) {
            return res.status(400).send('you are not authorized to perfom this action')
        }
        
        const DelpostandUpdate = await Post.findOneAndUpdate({_id : canDelPost._id}, {isDeleted: true}, {lean: true, new: true});
        return res.status(200).send({status:true, data: DelpostandUpdate})

    }catch(err){
        console.log(err);
        return res.status(500).send(err)
    }

}


export default {createPost, getAllpost,getPostById,updatePostById,DelPostById}