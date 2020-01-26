import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

const authRouter = express.Router()

let refreshTokens = []
let accessToken

// TESTING ROUTES WITH VALIDATION
authRouter.get('/secret',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.status(200).send({msg : 'OK'})
})

// Authenticate User Creating token & refresh token
authRouter.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})
  


const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })
}

export default authRouter;