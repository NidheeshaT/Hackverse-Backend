import mongoose from "mongoose";
import { Schema } from "mongoose";
const UserSchema = new Schema({
      id: {
       type: String,
       required: true,
       unique: true,
      },
      name: {
       type: String,
       required: true,
      },
      email: {
       type: String,
       required: true,
      },
    image: {
        type: String,
    },
});

const User = mongoose.model("User", UserSchema);
export default User;