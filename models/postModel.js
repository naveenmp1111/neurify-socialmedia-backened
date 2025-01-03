import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    },
    caption: {
        type: String
    },
    likes: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
}
    , {
        timestamps: true
    })

const Post = mongoose.model('Posts', postSchema)
export default Post