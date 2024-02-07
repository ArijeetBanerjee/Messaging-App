//this api takes users whoever login to the whattsapp using google authentication and saves it to database and shows the user list in whattsapp chat section
//axios is a library used to call api
//npm i axios
//we need to do error handling in api because if error happens like 400,500 code error then error handling is needed
import axios from 'axios';


const url='http://localhost:8000'; //this is the backend url which needs to be passed as a parameter

export const addUser = async (data) =>{ //await works with async function so async word is needed....the data here is the post api body
   try { //this api will be having an endpoint which will hit in the backend
     await axios.post(`${url}/add`, data); //await is used because it tells the java compiler to wait till the response comes.once response comes then only run the post function
   } catch (error) { //http://localhost:8000/add...here /add is the endpoint which will hit when response comes
     console.log('Error while ADDuser API',error.message);
   }

}

//api to get user from database
export const getUsers = async() =>{  //here we will have no data as parameter betting we are getting users from database.
    
  try {
    let response=await axios.get(`${url}/users`);
    return response.data; //response.data contains the array of object of users
  } catch (error) {
    console.log('error while calling getUsers api',error.message);
  }
}//we will call this api when the component will load so that all users are shown in the chat menu


//api to set seperate chatwindow for each user when i click on that user
export const setConversation = async (data) =>{
  try {
    await axios.post(`${url}/conversation/add`,data) // with the help of axios we can call an api
  } catch (error) {
    console.log('error while calling setConversation api',error.message);
  }
}

export const getConversation = async (data) =>{
  try {
   let response = await axios.post(`${url}/conversation/get`,data); // we have to define the endpoint in route
   return response.data;
  } catch (error) {
    console.log('error while calling getConversation api',error.message);
  }
}

export const newMessage = async (data) =>{
  try {
    await axios.post(`${url}/message/add`,data);
  } catch (error) {
    console.log("Error while calling newMessage api",error.message);
  }
}

//api to get chats from database and display all chats on frontend for a particular user in the chat window
export const getMessages = async(id) =>{
  try {
    let response = await axios.get(`${url}/message/get/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error while calling getMessage api",error.message);
  }
}

//api to upload files into mongodb 
export const uploadFile = async (data) =>{
  try {
    return await axios.post(`${url}/file/upload`,data);
  } catch (error) {
    console.log("Error while calling uploadFile api",error.message);
  }
}