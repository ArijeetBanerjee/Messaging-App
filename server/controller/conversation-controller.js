
import Conversation from "../model/Conversation.js";


export const newConversation = async(request,response) =>{
    try {
        const senderId = request.body.senderId;
        const recieverId = request.body.recieverId;
        
        const exist = await Conversation.findOne({members: {$all :[recieverId,senderId]}});//everytime I click a user a new conversation chat will be generated so I need to see if old chat exists or not..if exist then i need to load old chat window 
//$all checks  all elements in that array and matches with recieverid and senderId..if these two present in the array  or not ...member key is specified in model/conversation.js
    if(exist){
        return response.status(200).json('conversation already exist');
    }

    const newConversation = new Conversation({
        members:[senderId,recieverId]
    })
    await newConversation.save(); //this will hit the mongodb and save the new user chat..save is inbuild function 
    return response.status(200).json('Conversation saved Successfully');
  } catch (error) {
        return response.status(500).json(error.message);
    }
}

export const getConversation = async (request,response) =>{
    try {
        const senderId = request.body.senderId;
        const recieverId = request.body.recieverId;

        let conversation = await Conversation.findOne({ members: {$all: [recieverId,senderId]}})
        return response.status(200).json(conversation);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}