import {ExtractJwt, Strategy as JwtStrategy} from "passport-jwt"
import UserModel from "../models/userModel.js";



const JWTOption ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // secretOrKey : process.env.MYSECRET ,
    secretOrKey : "this is the password that we sett it by self",
}


const passportStrategy = new JwtStrategy(JWTOption, async function(jwt_payload, done) {

    try {
        const user= await UserModel.findOne({_id: jwt_payload.sub} );
        if (user) {
            
            return done(null, user)
        }
        if (!user) {
            return done(null, false)

        }
    } catch (error) {
        return done(error, false)
    }
    
})

export  default passportStrategy