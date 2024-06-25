import passport from "passport"



const JWTAuth = passport.authenticate('jwt', { session: false })

export default JWTAuth

