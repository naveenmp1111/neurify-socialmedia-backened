export const authMiddleware = (req, res, next) => {
    const user = 'user'
    if (user) {
        next()
    } else {
        res.status(400).json({
            message: 'invalid user'
        })
    }
}