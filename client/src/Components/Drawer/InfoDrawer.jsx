//Drawer that opens by clicking the dp
//drawer code ,menu code all this are present in material UI

import { Box, Drawer,Typography,styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Profile from "./Profile";

//2 components(arrow and profile) which are one after another down comes side by side using display flex
const Header=styled(Box)`
 background:#008069; 
 height:107px;
 color:#FFFFFF;
display:flex; 
& > svg,& > p{  //Arrowback is the component name but internally it is called svg.tyography is same as p tag 
  margin-top:auto;
  padding:15px;
  font-weight:600;
}
`;

const Component = styled(Box)`
  background: #ededed;
  height:85%;
`;

const Text = styled(Typography)`
  font-size:18px;
`;

const drawerStye = {
   Left:20,
   top:11,
   height:'95%',
   width:'30%',
   boxShadow:'none'
}

const InfoDrawer = ({open,setOpen}) =>{ //{open : true,setOpen:function() } = props

   const handleClose = () =>{

    setOpen(false);
   }

    return(
        <Drawer open={open} onClose={handleClose} PaperProps={{sx:drawerStye}} style={{zIndex:1500}}> {/*onclose helps to close the drawer when clicked outside the drawer...zindex checks between 2 components and whose zindex is greater it comes top of the other component.here the drawer was opening behind the chat menu,so zindex is increased so that it opens top of the chat menu*/}
        <Header>
          <ArrowBack onClick={() =>setOpen(false)}/>
          <Text>Profile</Text>
        </Header>
        <Component>
            <Profile/>
        </Component>
        </Drawer>
    )
}

export default InfoDrawer;