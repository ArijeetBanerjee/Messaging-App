//this component will display the data of a particular user on menu chat

import { Box,Typography,styled } from "@mui/material";
import { useContext,useEffect,useState } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { setConversation,getConversation } from "../../../service/api";
import { formatDate } from "../../../utils/common-utils";

const Component = styled(Box)`
  display:flex;
  height:45px;
  padding:13px 0;
  cursor:pointer; //when I point to the name the cursor will act as a pointer
`;

const Image= styled('img')({
    width:50,
    height:50,
    borderRadius: '50%' ,//to reduce the black shade on picture forming in background square
    padding:'0 14px'
});

const Container = styled(Box)`
 display:flex;
`;

const Timestamp = styled(Typography)`
  font-size:12px;
  margin-left:auto;
  color:#00000099;
  margin-right: 20px;
`;

const Text = styled(Typography)`
  font-size:14px;
  color:rgba(0,0,0,0.9);
`;

const Conversation = ({user}) =>{ //as i send user data as prop in conversation.jsx,so i can destructure the user data by taking argument 
  
    const {setPerson,account,newMessengeFlag} = useContext(AccountContext);

   const [message,setMessage] = useState({});

    useEffect(() =>{//to show latest conversation in left side below dp and user name
        const getConversationDetails=async() =>{
            const data = await getConversation({senderId:account.sub,recieverId:user.sub});//this gives all the conversation chats
            setMessage({text: data?.message, timestamp: data?.updatedAt})
        }
        getConversationDetails();
    },[newMessengeFlag])

    const getUser = async() =>{ //
      setPerson(user);
      await setConversation({ senderId: account.sub, recieverId: user.sub}) //now we need to set up a coversation chat each time I click on a person,that particular chat with that person should open...so we need to create an API for that so that whenever I click on that person..then only the api call will happen and seperate chat window with that person with all chats must open.here we create a conversation between one person and another..to get this conversation we have to create getconversation
    }//sender and reciever id are the data which I pass in api as export const setConversation = async (data) =>{}..here the data is the ids comming from here

    return(
        <Component onClick={() => getUser()}> {/*when clicked on a particular user the particular chatwindow for that user must open on right side and also name and dp of that user should be shown in header of the right side chat window*/}
            <Box>
                <Image src={user.picture} alt="dp"/>
            </Box>
            <Box style ={{width:'100%'}}>
            <Container>
                <Typography>{user.name}</Typography>
                {
                    message?.text &&
                     <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
                }
            </Container>
            <Box>
                <Text>{message?.text?.includes('localhost') ? 'media' : message.text}</Text>
            </Box>
            </Box>
        </Component>
    )
}

export default Conversation;


