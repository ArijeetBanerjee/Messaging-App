
import {Dialog,Box,Typography, ListItem,styled,List} from '@mui/material';
import { qrCodeImage } from '../../Constants/data';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { addUser } from '../../service/api';

//display:flex allign the top down box into side by side box
const Component = styled(Box)` 
  display:flex; 
`

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`
const QRcode = styled('img')({ //as img is html tag and not material Ui component so we have to use single quote and first and third bracket
  height:264,
  width:264,
  margin:'50px 0 0 30px'
});

const Title =styled(Typography)`
  font-size:26px;
  color:#525252;
  font-weight;300;
  font:family:inherit;
  margin-bottom:25px
`;

const StyledList =styled(List)`
 & > li{
    padding:0;
    margin-top:15px;
    font-size:15px;
    line-height:28px;
    color: #4a4a4a
 }
`
const dialogStyle = {
   height:'96%',
   marginTop:'12%',
   width:'60%',
   maxWidth:'100%',
   maxHeight:'100%',
   boxShadow:'none',
   overflow:'hidden'
}
const LoginDialog = () => {
 
       const {setAccount} = useContext(AccountContext);

    const onLoginSuccess = async (res) => {   //whoever is logging using google authentication is stored here
        const decoded = jwtDecode(res.credential);
        console.log(decoded);
        setAccount(decoded);
        await addUser(decoded);//decoded is the data that is passed to the adduser api.we made a api call here.also as in the api.js we are using await and async so we need to use it here as well
    }
    const onLoginError = (res) =>{
        console.log('Login Failes',res);
    }
    return(
        <Dialog
          open={true} //always dialog box will be open
          PaperProps={{sx:dialogStyle}} //The sx prop provides a concise way to apply styles without creating a separate styled component. It's often used for inline styling within JSX.
          hideBackdrop={true} //hidebackdrop removes the background shadow of dialog box./the main background get shadowed./so to remove it set true value
        >
           <Component>
            <Container>
               <Title>To use WhattsaApp on Your Computer </Title>
               <StyledList>
               <ListItem>1.Open WhattsApp on Your Phone</ListItem>
               <ListItem>2.Tap Menu Setting and Select Whattsapp Web</ListItem>
               <ListItem>3.Point your phone to this Screen to Capture the Code</ListItem>
               </StyledList>
            </Container>
            <Box>
               <QRcode img src={qrCodeImage} alt="qrcode"/>
               <Box>
                <GoogleLogin
                   onSuccess={onLoginSuccess} //if login is successfull then this onLoginSuccess function will run
                   onError={onLoginError}              
                />
               </Box>
            </Box>
            </Component>
         </Dialog>
    )
}

export default LoginDialog;