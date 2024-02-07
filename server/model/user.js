//whatever the request that comes from frontend we need to validate it before pushing it to database.
//for example-if name is not given then i have to validate to give name otherwise it will not be saved to database
//we can validate using mongoose

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    iss: {  //it checks if the iss is string or not
        type: String
    },
    azp: {
        type: String
    },
    aud: {
       type: String
    },
    sub: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    email_verified: {
        type: Boolean
    },
    nbf: {
        type: Number
    },
    name: {
        type: String,
        required: true //name is needed compulsory,so I made required:true
    },
    picture: {
        type: String,
        required: true
    },
    given_name: {
        type: String
    },
    family_name: {
        type: String
    },
    iat: {
        type: Number
    },
    exp: {
      type:Number
    },
    jti: {
        type:String
    }
});

//we need to create a model/collection for our database to store
const user=mongoose.model('user',userSchema);//'user' is the collection name

export default user;