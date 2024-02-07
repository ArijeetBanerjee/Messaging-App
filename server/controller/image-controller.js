//this is for mongodb server where our files will be uploaded which we send through clipicon in whattsapp
import  grid  from 'gridfs-stream'; //the files/image are stored in fs.files in mongodb server in form of binary...gridfs-stream is used to convert that binary to string..to use it -> npm i gridfs-stream 
import mongoose from 'mongoose';//mongoose is used to tell from which database we need to import the file/image to show it in frontend

const url ="http://localhost:8000";

let gfs,gridFsBucket; //to fetch file/image from database
const conn = mongoose.connection; //opens the mongodb connection
conn.once('open', () =>{ //when connection is open then the 2nd callback connection will call data from database
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db,{
    bucketName: 'fs'
  });
  gfs=grid(conn.db,mongoose.mongo); //we pass the databse name and mongoose mongo server to grid
  gfs.collection('fs');
}) //check code from gridfs-steam codebase of npm


export const uploadFile = async(request,response) =>{ //upload file to database
    if(!request.file){ //if no file is send from frontend
      return response.status(404).json('File not Found');
    }
    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);
}

export const getImage = async(request,response) =>{
  try {
    const file = await gfs.files.findOne({filename: request.params.filename}); //searching the filename from mongodb server fs.files..it is the same filename as mentioned in route.js
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(response); //learn nodejs stream and pipe concepts
  } catch (error) {
    return response.status(500).json(error.message);
  }
}