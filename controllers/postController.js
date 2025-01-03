import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

export const createPost = asyncHandler(async (req, res) => {
    try {
        const { image, caption, userId } = req.body
        if (!image || !userId) {
            res.status(400).json({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const newPost = new Post({
            image,
            caption,
            userId
        })

        const postCreated = await newPost.save()
        if (postCreated) {
            res.status(201).json({
                success: true,
                message: 'Post created successfully'
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occured while creating post'
        })
    }
})

export const updatePost = asyncHandler(async (req, res) => {
    try {
        const { caption, postId } = req.body
        if (!postId) {
            res.status(400).json({
                success: false,
                message: 'Required fields are missing'
            })
        }
        const post = await Post.findByIdAndUpdate(postId, { caption })
        if (post) {
            res.status(200).json({
                success: true,
                message: "Post updated successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while updating Post'
        })
    }
})

export const deletePost = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params
        if (!postId) {
            res.status(400).json({
                success: false,
                message: "cannot find post"
            })
        }
        const deletePost = await Post.findByIdAndDelete(postId)
        if (deletePost) {
            res.status(200).json({
                success: true,
                message: 'Post deleted successfully'
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while deleting the Post'
        })
    }
})