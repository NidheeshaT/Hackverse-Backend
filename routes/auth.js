import passport from "passport";
import { Router } from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import User from "../models/UserModel.js";
dotenv.config();

const router = Router();
passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/',
    scope: [ 'profile','email' ],
    // passReqToCallback: true
    },
    async function verify(accessToken, refreshToken, profile, done) {;
        return done(null, profile);
    }))
router.get('/google',passport.authenticate('google'));

passport.serializeUser(async function(profile, done) {
        let user=await User.findOne({id:profile.id})
        console.log(user)
        if(!user){
            console.log("creating new user")
            user=new User({id:profile.id,name:profile.displayName,email:profile.emails[0].value,image:profile.photos?profile.photos[0].value:undefined})
            user.save()
       }
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default router;