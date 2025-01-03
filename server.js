import express from 'express';
import mongoose from 'mongoose';
import { registerUser, Login } from './controllers/userController.js';
import { createPost, updatePost, deletePost } from './controllers/postController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

mongoose.connect('url')
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err))

//Authentication section
app.post('/api/register', registerUser)
app.post('/api/login', Login)

//Post section
app.post('/api/createPost', authMiddleware, createPost)
app.put('api/updatePost', authMiddleware, updatePost)
app.delete('api/deletePost/:postId', authMiddleware, deletePost)

app.listen(3000, () => {
    console.log('server running successfully')
})