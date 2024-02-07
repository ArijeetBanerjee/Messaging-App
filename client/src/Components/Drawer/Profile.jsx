//this component is for the drawer (by clicking dp) below the green header

import { Box,Typography,styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../context/AccountProvider";

const ImageContainer = styled(Box)`
    display:flex;
    justify-content:center; 
`;//we  cannot use justify-content without using display flex

const Image = styled('img')({
    width:150,
    height:150,
    borderRadius:'50%',
    padding:'10px 0'
});

const BoxWrapper = styled(Box)`
   background:#FFFFFF;
   padding:12px 30px 2px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.08);
   & :first-child{      //this part is for the first topography i.e your name
    font-size:13px;
    color:#009688;
    font-weight:200;
   }
   & :last-child{  //this part is for 2nd topography i.e account.name
     margin:5px 0;
     color:#4A4A4A;
   }
`;

  const DescriptionContainer = styled(Box)`
     padding: 15px 20px 28px 30px;
     & {  //it will work for all the text.we can also specify using &>p{}
        font-size:13px;
        color:#8696a0;
     } 
  `;

const Profile = () =>{

    const {account} = useContext(AccountContext);

    return(
        <>
        <ImageContainer>
            <Image src={account.picture} alt="dp"/>
        </ImageContainer>
        <BoxWrapper>
            <Typography>Your Name</Typography>
            <Typography>{account.name}</Typography>
        </BoxWrapper>
        <Box>
        <DescriptionContainer>This is not your username or pin.this name will be visible to your whattsapp contacts</DescriptionContainer>
        </Box>
        <BoxWrapper>
        <Typography>About</Typography>
            <Typography>Eat! sleep! Code! Repeat!</Typography>
        </BoxWrapper>
        </>
    )
}

export default Profile;