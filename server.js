const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { registerUser, Login } = require('./controllers/userController')
const { createPost, updatePost, deletePost } = require('./controllers/postController')
const { authMiddleware } = require('./middlewares/authMiddleware')


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