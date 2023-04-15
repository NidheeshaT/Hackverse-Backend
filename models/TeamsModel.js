import mongoose from "mongoose";
import { Schema } from "mongoose";

const TeamSchema = new Schema({
    users:[
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;