import { useContext,useState } from "react";
import { AccountContext } from "../../context/AccountProvider";
import { Box,styled } from "@mui/material";
import {Chat as MessageIcon,DonutLarge} from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../Drawer/InfoDrawer";


const Component = styled(Box)`
  height:44px;
  background:#ededed;
  padding: 8px 16px;
  display:flex;
  align-items:center;
`;

const Wrapper  = styled(Box)`
  margin-left:auto;
  & > *{  //* is used to handle all child component
  margin-left:2px;
  padding:4px;
  color:#000;
  };
  & :first-child{
    font-size:22px;
    margin-right:8px;
    margin-top:3px;
  }
`
 const Image = styled('img')({
    height:40,
    width:40,
    borderRadius:'50%',
 })
const Header = () =>{
    
      const [openDrawer,setOpenDrawer] = useState(false) // initially dp drawer will be closed


    const {account} = useContext(AccountContext);

    const toggleDrawer = () =>{
          setOpenDrawer(true);
    }

    return(
       <>
         <Component>
           <Image src = {account.picture} alt="dp" onClick={()=>toggleDrawer()}/> {/* it is used to take our gmail image from google oauth to show it in upper left corner as our dp in whattsapp,,picture here is an inbuild attribute*/}
           <Wrapper >
            < DonutLarge/>
          <MessageIcon/>
          < HeaderMenu setOpenDrawer={setOpenDrawer}/>
            </Wrapper >
        </Component>
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer}/>
       </>
    )
}

export default Header;