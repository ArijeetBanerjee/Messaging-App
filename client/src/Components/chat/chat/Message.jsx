//this component is to display messages

import { Box,Typography,styled } from "@mui/material";
import { formatDate,downloadMedia } from "../../../utils/common-utils"; //common code which i can resue without writing the code again and again
import { useContext } from "react"; 
import { AccountContext } from "../../context/AccountProvider"; //to get information of the person who is logged in 
import GetAppIcon from '@mui/icons-material/GetApp'; //download icon
import { iconPDF } from "../../../Constants/data";


//Own is the css for send mssg i.e to shown in right 
const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding:5px;
  width: fit-content; //the message colour will be fit only what is needed for the message.no extra width of the message
  display:flex;
  border-radius:10px;
  word-break: break-word; //this is css to handle if message max width gets crossed then message will break and shown in next line
`;

//recieved text css
const Wrapper = styled(Box)`
  background: #FFFFFF;
  max-width: 60%;
  padding:5px;
  width: fit-content; //the message colour will be fit only what is needed for the message.no extra width of the message
  display:flex;
  border-radius:10px;
  word-break: break-word; //this is css to handle if message max width gets crossed then message will break and shown in next line
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
font-size:10px;
color: #919191;
margin-top: 6px;
word-break: keep-all; //if 11:45 is the time and due to width max word break keeps 11 at top and 45 below..to handle this we write keep-all..so 11:45 together will come down 
margin-top:auto;
`;

export const Message = ({message}) =>{ //all our message are passed as prop which we are detaching and showing one by one in loop from messages.jsx

     const {account} = useContext(AccountContext); //we get the account who is loggedin from accountcontext 

    return(
        //if messages are send from logedin user then show in right or else if mssg is recieved then show in left 
        <> 
           {
            account.sub === message.senderId ?
            <Own>{/*sender message*/}
              {//right now whatever the file/image i am sending it is sended as a link..to send the actual file/image instead of link we need to write the below code written within {} 
                 message.type === 'file' ? <ImageMessage message={message}/> :<TextMessage message={message}/>
              }
           </Own>
         : 
         <Wrapper>
          {//this is for reciever side display
                 message.type === 'file' ? <ImageMessage message={message}/> :<TextMessage message={message}/>
            }
         </Wrapper>  
           }
        </>
        
    )
}

const ImageMessage = ({ message }) => {
  return (
    <Box style={{position: 'relative'}}> {/*to get the download icon and time in corner of image and not below*/}
      {message && message.text && message.text.includes('.pdf') ? (
        <Box style={{display:'flex'}}>
          <img src={iconPDF} alt="pdf" style={{width:80}}/>{/* Your PDF content here..likewise we can show any file extension content */}
          <Typography style={{fontSize: 14}}>{message.text.split('/').pop()}</Typography> {/*only the name will display and not the whole link*/}
        </Box>
      ) : (
        <img style={{width: 300,height: '100%',objectFit:'cover'}}src={message && message.text} alt={message && message.text} />
      )}
      <Time style={{position:'absolute',bottom:0, right:0}}> {/*to get the download icon and time in corner of image and not below*/}
        <GetAppIcon onClick={(e) => downloadMedia(e,message.text)} style={{marginRight:10,border:'1px solid grey',borderRadius:'50%'}} fontSize="small"/> {/*onclick func is to download file/image..message.text is the url link */}
        {formatDate(message.createdAt)}
        </Time> 
    </Box>
  );
};


const TextMessage = ({message}) =>{

  return(
    <>
     <Text>{message.text}</Text>
    <Time>{formatDate(message.createdAt)}</Time> {/*pasing the timestamp to commom-util.js*/} 
    </>
  )
}

export default Message;