//this will be the landing page in right side

import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { useContext, useEffect,useState } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { getConversation } from "../../../service/api";

const ChatBox = () =>{
   
   const {person,account} = useContext(AccountContext); //importing account and person

   const [conversation,setConversation] = useState({});

   useEffect(() =>{
      const getConversationDetails = async () => { //here we will call an api so using async function
        let data = await getConversation({senderId: account.sub ,recieverId: person.sub}); //a database object is created which we can see in mongodb server same format as made in model/conversation.js...also we need to make an api with getconversation name
        setConversation(data);
      }
      getConversationDetails();
   },[person.sub]); //I need to call this useeffect func everytime whenever I click on a person ..so I passed person.sub in the 2nd parameter

    return(
        <Box style={{ height: '75%'}}>
          <ChatHeader person={person}/>
          <Messages person={person} conversation={conversation}/>
        </Box>
    )
}

export default ChatBox;