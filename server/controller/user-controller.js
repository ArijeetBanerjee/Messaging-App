//this will add the user to the database

import user from "../model/user.js"; //all schema are present in here where the validation occur

//adding a user to database
export const addUser = async (request,response) =>{ //this is an api function so it have request and response
  try {
   let exist= await user.findOne({sub : request.body.sub}); //it finds if any object/user exist in the sub field ...also mongodb server is running on cloud so it is asynchronous so need to include await and async
   if(exist) {
    response.status(200).json({msg:'user already exist'});
    return;
   }
  const newUser= new user(request.body); //if user doesnt exist then it will validate it..after validating we will get new user for mongodb
  await newUser.save(); //this saves the newUser to mongodb  
 return response.status(200).json(newUser);
} catch (error) {
     return response.status(500).json(error.message);
  }
}


//retrieving all users from database and show it in chat menu
export const getUsers = async (request,response) =>{
  try {
    const users= await user.find({}) //find() function is used to get all data where findone() func is used to for one data
    return response.status(200).json(users);
  } catch (error) {
    return response.status(500).json(error.message);
  }
}