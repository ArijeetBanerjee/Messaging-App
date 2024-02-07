//this is the endpoint that the api will hit
//for example-http://facebook.com/home...here home is an endpoint ,similarly facebook.com/profile...here profile is the endpoint 
//we can do routing using express
import express from 'express';
import { addUser,getUsers } from "../controller/user-controller.js";
import { newConversation , getConversation} from '../controller/conversation-controller.js';
import { newMessage,getMessages} from '../controller/message-controller.js';
import { uploadFile,getImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';

const route=express.Router();

route.post('/add',addUser);//we are making a endpoint here for our main url(http://localhost:8000).the endpoint is add..in the 2nd argument there is a callback function which defines what will happen after we hit the endpoint /add.it is defined in user-controller.js
route.get('/users',getUsers); //getting data from database to show it as user in chat menu

route.post('/conversation/add',newConversation);//we made a new API function named newConversation and this api will open the chat with that particular user when clicked..the function is present inside controller folder in server
route.post('/conversation/get',getConversation);

route.post('/message/add',newMessage);
route.get('/message/get/:id',getMessages); //to get all chats from database and show it in frontend chatwindow...:id is param here..the url will be like localhost/8000/message/get/13565434...here the id is the conversation id


route.post('/file/upload',upload.single("file"), uploadFile); //2nd argument upload here is the middleware.middleware is called before api..middleware is basically used if we want to perform something before api call...we need middleware for this because we are atfirst dividing the files in chunk so we also need to unite the file which is done by middleware..the route redirects to image-controller.js where uploadFile func in present
route.get('/file/:filename',getImage); //to get from database and show it in frontend
//"http://localhost:8000/file/1706630073575-file-Profile_Pic.jpg" whatever is after file/170.... it is the filename we have taken in route.we can see it from preview in network tab of inspect browser
export default route; //we need to connect it to index.js