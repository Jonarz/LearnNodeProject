import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import * as routes from './routes';
import passport from 'passport'
import passportJWT from 'passport-jwt'
import morgan from 'morgan'
const JWTStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt


const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}

const strategy = new JWTStrategy(opts,(payload,next)=>{
    //TODO: GET USER FROM DB
    const user = null
    console.log("VALIDAMIENTO",payload)
    next(null,payload)
})

passport.use(strategy)

const app = express()
app.use(express.json())
app.use(passport.initialize())
app.use(morgan('combined'))


app.use('/auth', routes.authRouter)



const PORT = process.env.PORT || 3000
app.listen(PORT,()=> console.log('Server started on port '+PORT))