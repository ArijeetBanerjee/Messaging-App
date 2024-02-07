
//npm i mongoose
//mongodb is runinng differently in cloud environment of AWS.so we need to do error handling also because if server down or error happens then it needs to be handled
//after setup call the connection function in index.js 
//we install a package npm i dotenv.under dotenv(.env)file we mention all our environment variable i.e all sensitive information regarding mongodb username or password,all are kept in dotenv file
import mongoose from "mongoose";
import dotenv from 'dotenv';

//to initialise dotenv file we have to write
dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD; 

const Connection = async () =>{ //it is a bad coding practise to show username and password in url so we make a dotenv file and fetch the username and password from there into the url
    const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-pttgeby-shard-00-00.fnt8mv4.mongodb.net:27017,ac-pttgeby-shard-00-01.fnt8mv4.mongodb.net:27017,ac-pttgeby-shard-00-02.fnt8mv4.mongodb.net:27017/?ssl=true&replicaSet=atlas-w512jd-shard-0&authSource=admin&retryWrites=true&w=majority`;
   try {//the connect is an asynchronous function,so we have to use await and async so that mongodb only runs when a request comes untill then it waits
    await mongoose.connect(URL,{useUnifiedTopology:true}) //first argument-mongodb connection url,...2nd argument-it is an object which defines how my mongodb will behave,..useunifiedtopology tells the mongodb to use all latest parts of mongodb
    console.log('Database connected Successfully');
  } catch (error) { 
    console.log('Error while connecting with the database',error.message);
   }
}

export default Connection;