import Message from "../model/Message.js";
import Conversation from "../model/Conversation.js";

export const newMessage = async(request,response) =>{
  try {
    const newMessage = new Message(request.body);

    await newMessage.save();
    await Conversation.findByIdAndUpdate(request.body.conversationId,{ message: request.body.text}); //the latest message is stored in the conversation so that we can show the latest message below the user dp image of every user

    return response.status(200).json('Message has been send successfully');
  } catch (error) {
     return response.status(500).json(error.message);
  }
}

//now we have to fetch message from database to the frontend so that we can see all chats with a particular user
export const getMessages = async (request,response) =>{
    try {
        const messages = await Message.find({conversationId:request.params.id}); //with the help of conversationid we will get all our chats and now we have o send it to the frontend
        return response.status(200).json(messages);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}