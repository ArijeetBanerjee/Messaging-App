//we will be making a server here using express which will be running on a port
//we need to write "type":"modeule"; in package.json because we are importing express as module
//to check if the server is running or not we can write  "start": "nodemon index.js" in script,also write in terminal npm i nodemon...node is used to run any node or express server and then the file name index.js.after that write command in terminal npm start
//we need to run npm i cors to install cors package...cors is an error that occur when we try to share data to 2 different ports..in my case frontend is in port 3000 and backend is in port 8000.so 2 different ports that why cors error is comming in browser network section of inspect.to handle this we need to install cors package
//also npm i body-parser to use request.body on api functions (used in user-controller.js)...To handle the post api request body we need bodyparser


import express from 'express';
import Connection from './database/db.js';
import Route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app=express()

app.use(cors()); //allowing cors function so that browser now handle the network in inspact cors error while adding user from google authentication sign in
app.use(bodyParser.json({extended:true}));//the body comes in json format which needs to be parse
app.use(bodyParser.urlencoded({extended:true}));//example-facebook.com/home?query=code%90index%45interview is the website we see where there are actually spaces between code and index and interview but website cannot understand spaces so it includes random no...now we need to parse this url to actual url without the random no's thats why bodyparser urlencoded is used
app.use('/',Route); //done using express


Connection();
//creating server
const PORT=8000;
app.listen(PORT, () => console.log('server is running successfully on PORT', PORT)); //port where the server is running , callback function when server is running successfully and then we want to do something ,that can be done using callback function 