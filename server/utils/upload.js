//this is the middleware which we will use to store our file/image in the database
//we cannot directly store image or file in database..the file data we send is in binary format as shown in image.so we need to parse form data
//we have a library named multer in nodejs which parse and handle formdata..to get this -> npm i multer
//multer is anode.js middleware for handling multipart/form data which is primarily used for uploading files.
//there is also an helping library of multer named multer-gridfs-storage to store uploaded file directly to mongodb..to use it -> npm i multer-gridfs-storage
//see documentary to understand code
import multer from 'multer';
import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD; 

const storage = new GridFsStorage({
    url: `mongodb://${USERNAME}:${PASSWORD}@ac-pttgeby-shard-00-00.fnt8mv4.mongodb.net:27017,ac-pttgeby-shard-00-01.fnt8mv4.mongodb.net:27017,ac-pttgeby-shard-00-02.fnt8mv4.mongodb.net:27017/?ssl=true&replicaSet=atlas-w512jd-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: {useUnifiedTopology:true , useNewUrlParser: true} ,//useunifiedtopology tells the mongodb to use all latest parts of mongodb...UsenewUrlParser tells mongodb that their old parser is depricated so use the new parser
    file: (request, file) =>{
        const match = ["image/png","image/jpg"]; //checking if files are of these formats

        if(match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-file-${file.originalname}`;
        }
        return{
            bucketName:"photos",
            filename:`${Date.now()}-file-${file.originalname}`
           
        }
    }
});

export default multer({storage});

//the middleware was getting crash basically the variable using which I was calling _id has a value undefined and undefined._id will give error. so I need to run  npm i mongodb@5.9.1 --legacy-per-deps --force which I found on github issue.I think
//this issue is formed when we tries to upload file on mongodb and it tries to generate an id which is automatically generated by default but in the absense of mongodb it is unable to so.