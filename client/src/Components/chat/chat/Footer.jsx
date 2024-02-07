//This part is for the footer of the chat window on right side where chats will be typed and send

import { Box ,InputBase,styled} from '@mui/material';
import {EmojiEmotionsOutlined,AttachFile,Mic} from '@mui/icons-material';
import { useEffect } from 'react'; //the useeffect is used here to send files into mongodb when we press enter using clipicon of footer.to do that we need to call an api
import { uploadFile } from '../../../service/api';

const Container = styled(Box)`
   height:65px;
   background:#ededed;
   display: flex;
   width: 100%;
   lign-items:center;
   padding:0 15px;
   & > *{
    margin:5px;
    color:#919191;
   }
`;

 const Search = styled(Box)`
   background-color: #FFFFFF;
   border-radius:18px; //this is to make the chat type bar curved and not squared
   width: calc(94% - 100px);
 //this is search bar width - mic width
 `;

  const InputField = styled(InputBase)`
     width:100%;
     padding:20px;
     height:20px;
     padding-left:25px;
     font-size:14px;
  `;

  const ClipIcon = styled(AttachFile)`
    transform:rotate(40deg);
  `;//to rotate the clip icon 40degree..our clip was vertical straight,so we rotate it using transform rotate

const Footer = ({sendText,setValue,value,file,setFile,setImage}) =>{

  useEffect(() =>{ //the api will send the file to mongodb if file is selected.we can also select multiple file so [file] is given
    const getImage = async () =>{
      if(file){
       const data=new FormData() //we cannot send file to mongodb through api as it is..we need to divide the file into chunks in order to send which is done by formdata()
       data.append("name",file.name);
       data.append("file",file);
      let response = await uploadFile(data); //this is the api which will work in backend to upload data to mongodb
      setImage(response.data); //to send file/image from database to frontend
      }
    }
    getImage();
  },[file])

  const onFileChange = (e) => {
    setFile(e.target.files[0]); //it is an array and in 0th position we get the file name
    setValue(e.target.files[0].name); //change the file name to its file name given not some random text 
   // console.log(e);
  }

    return(
        <Container>
            <EmojiEmotionsOutlined/>
            <label htmlFor="fileInput"> {/*we hide fileupload with clipicon..this id is given below. */}
            < ClipIcon/>
            </label>
            <input type="file" id="fileInput" style={{display:'none'}} onChange={(e) =>onFileChange(e)}/> {/*to upload file in whattsapp ..onFileChange func is to select multiple files*/}
            < Search>
                <InputField placeholder='Type a Message' onChange={(e) => setValue(e.target.value)} onKeyPress={(e) => sendText(e)} value={value}/> {/*whatever we type it will go to text state and now whenvere I click enter i need to save the state in database.onkeypress does that...e is the eventlistener */}
            </ Search>
            <Mic/>
        </Container>
    )
}

export default Footer;