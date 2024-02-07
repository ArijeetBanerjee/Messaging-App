//header part of the right side chat window

import { Box,Typography,styled } from "@mui/material";
import { Search,MoreVert } from "@mui/icons-material";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider"; //for setting users status as online/offline

const Header =styled(Box)`
    height:44px;
    background: #ededed;
    padding: 8px 16px;
    display:flex;
    align-items:center;
`;

const Image = styled('img')({
   height:40,
   width:40,
   borderRadius:'50%', //it makes the square image circular
   objectFit:'cover' //it fits the image into the circle proportionally
});

const Name = styled(Typography)`
  margin-left:12px;
`;

const Status = styled(Typography)`
  margin-left:12px;
  font-size:12px;
  color: rgb(0,0,0,0.6);
`;

const RightContainer = styled(Box)` 
margin-left:auto; 
& > svg{
  padding: 8px;
  font-size: 22px;
  color: #000;
}
`; //auto shifts the search icon and morevert icon the the right side possible....also both search and morevert icon are internally svg.Rightcontainer here is the parent of search and morebert.so to handle child component from paarent component we can do that by & > svg{}...svg because both search and morvert are internally svg

const ChatHeader = ({person}) =>{

  const {activeUsers} = useContext(AccountContext); //for setting user status as online/offline

    return(
        <Header>
            <Image src={person.picture} alt="dp"/>
            <Box>
                <Name>{person.name}</Name>
                <Status>{activeUsers?.find(user => user.sub === person.sub) ? 'Online' : 'Offline'}</Status>{/*for setting user status as online/offline*/}
            </Box>
            <RightContainer>
                 <Search/>
                 <MoreVert/>
            </RightContainer>
        </Header>
    )
}

export default ChatHeader;