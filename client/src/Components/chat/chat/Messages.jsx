//chat message part of right side chat window

import { useContext,useState,useEffect } from "react"; //this is needed to get the senderID ..i.e the person who is loged we is saved in usecontext...useEffect is used to fetch messages so that when i will click on an user,all messages with that user should be shown...here useref is used so that we can place scrollbar down to see latest mssg always
import { AccountContext } from "../../context/AccountProvider";
import { Box,styled } from "@mui/material";
import Footer from "./Footer";
import { getMessages, newMessage } from "../../../service/api";
import Message from "./Message";

const Wrapper = styled(Box)`
  background-image: url(${'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png'}); 
  background-size:50%;           //it helps to adjust the background photos of the total image
`; //by declaring image like this I can write easily above the image..otherwise if i would use img tag then I have to play with absolute/relative position to write or show text above the image

const Component = styled(Box)`
height:80vh; //this height is used to show the backgorund image we have to give height
   overflow-y: scroll; //to get vertical scroll bar for chats to scroll
`;

const Container = styled(Box)`
   padding: 1px 80px;
`;

const Messages = ({person,conversation}) =>{

   const [value,setValue] = useState(''); //initially we pass an empty array in usestate,it will change with the text that we type..we will get that text from onclick in the inputfield of Footer.jsx
  
   const [messages,setMessages] = useState([]); //to store all messages in this message state and then displaying it inside the component below
   const [incomingMessage,setIncomingMessage] = useState(null);
   const { account,socket,newMessengeFlag, setMessengeFlag } = useContext(AccountContext);
   const [file,setFile] = useState(); //this state is for footer clipicon to select and hold file so that multiple file can be send
  const [image,setImage] = useState('');//string will come from database as url for the file/image i.e uploaded and then to be send to frontend
 


  useEffect(() =>{
   socket.current.on('getMessage',data =>{
      setIncomingMessage({
         ...data,
         createdAt: Date.now()
      })
   })
  },[]);


  useEffect(() => {
   const getMessageDetails = async() =>{
      let data= await getMessages(conversation._id);//we get this from database
      setMessages(data); //all messages based on the conversation id will be shown on frontend
   }
   conversation._id && getMessageDetails(); //if only we have conversation._id,then only the func will be called
  },[person._id,conversation._id,newMessengeFlag])//whenever person id changes..i.e whenever we switch to a different person chat..the messages for that person should be shown

 
  useEffect(() =>{
   incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
     setMessages(prev => [...prev,incomingMessage])
  },[incomingMessage,conversation])

  const sendText = async (e) =>{ //this function will run with the onKeyPress present in footer.so we need to pass this sendText as prop in footer and as we sending it as prop so we have to pass this prop as argument in the Footer function 
   //console.log(e);
    const code=e.keyCode || e.which; //e.which we get a unique keycode for each key ..like for d it is 100..for enter it is 13
   if(code===13){
      let message ={};
      if(!file){
       message = { //this message details will be stored in database
         senderId:account.sub,
         recieverId:person.sub,
         conversationId:conversation._id,
         type: 'text',
         text:value
      }
   }
   else{
       message = { //if what we select from clipicon is a file then earliar when we press enter the above code was running and only the file name text was sending so now we check if/else if it is file then else part will run and the document will be send
         senderId:account.sub,
         recieverId:person.sub,
         conversationId:conversation._id,
         type: 'file',
         text:image //here we will get image/file url that is fetched from the database
      }
   }
   socket.current.emit('sendMessage',message);
    //  console.log(message); //we can see all this from inspect console
    await newMessage(message);//this is for api cient to server
    setValue(''); //after entering mssg the input field should be empty again so that new mssg can be types and send again.so after sending a mssg we are setting setValue('')...for this we need to pass value={value} in footer
    setFile('');
    setImage('');
    setMessengeFlag(prev => !prev) //when we send a message we need to toggle the state from false to true or true to false so that useeffect is called and the message we send in displayed in frontend
   }
  }

    return(
        <Wrapper>
           <Component> {/* This is the part where the text mssg will be shown */}
    {//if messages are present then we have to loop all messages and print.it is an array of messages
       messages && messages.map(message => (
         <Container>
         <Message message={message}/>
         </Container>
       ))
    }
           </Component>
           <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage}/> {/*when we press enter in case of file or text the sendtext func present above will call and that file or text will be send */}
        </Wrapper>
    )
}

export default Messages;