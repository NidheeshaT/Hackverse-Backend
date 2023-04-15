import session from "express-session";
const Time=1000*60*60
import msession from "connect-mongodb-session";
import * as dotenv from "dotenv";
dotenv.config();
const MongoStore=msession(session)
const sessionMidware=session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie:{
    //   sameSite:"none",
      maxAge:Time,
    //   httpOnly:true,
    //   secure:true
    },
    store:new MongoStore({uri:process.env.CONNECT_DB_URL,collection:"sessions"})
})


export default sessionMidware