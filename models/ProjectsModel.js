import mongoose from "mongoose";
import { Schema } from "mongoose";

const TeamSchema = new Schema({
    team:{
            type: Schema.Types.ObjectId,
            ref: "Team"
        },
    title:{
        type: String,
        required: true,
    },
    html:{
        type: String,
    },
    css:{
        type: String,
    },
    js:{
        type: String,
    },
});
