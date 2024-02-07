
import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({ 
    members: {
        type: Array
    },
    message: {
        type: String
    }},
    {
        timestamps: true //when this api will hit..the timestamp of that time will be genrated
    }
);

const conversation = mongoose.model('Conversation',ConversationSchema);

export default conversation;
