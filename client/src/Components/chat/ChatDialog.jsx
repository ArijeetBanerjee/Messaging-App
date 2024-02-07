import {Box, Dialog,styled} from '@mui/material';
import Menu from './menu/Menu';
import Emptychat from './chat/emptychat';
import ChatBox from './chat/ChatBox';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';

const Component = styled(Box)` 
  display:flex; 
`;

const LeftComponent = styled(Box)` 
  min-width:450px; 
`;

const RightComponent = styled(Box)` 
  width:73%; 
  min-width:300px; 
  height:100%;
  border-left:1px solid rgba(0,0,0,0.14);//border between left and right in whattsapp chatlist and chatspace 
`;

const dialogStyle = {
  height:'96%',
  width:'100%',
  margin:'20px',
  maxWidth:'100%',
  maxHeight:'100%',
  boxShadow:'none',
  overflow:'hidden'
}
const ChatDialog = () =>{
  
   const {person}=useContext(AccountContext); //taking value from person

   return(
    <Dialog
    open={true} //always dialog box will be open
    PaperProps={{sx:dialogStyle}} //The sx prop provides a concise way to apply styles without creating a separate styled component. It's often used for inline styling within JSX.
    hideBackdrop={true} //hidebackdrop removes the background shadow of dialog box./the main background get shadowed./so to remove it set true value
  >
    <Component>
      <LeftComponent>
       <Menu/>
      </LeftComponent>
      <RightComponent>
        {Object.keys(person).length ? <ChatBox /> : <Emptychat />} {/* it checks if person object has keys then chatbox will open in right side else empty chat will be there...object.keys returns all the keys of the object(person).keys are like name:{arijeet} is 1 key.so this returns the list of all the keys and it returns an array.so we are checking array length is empty or not */}
      </RightComponent>
      </Component>
    </Dialog>
   )    
}

export default ChatDialog;