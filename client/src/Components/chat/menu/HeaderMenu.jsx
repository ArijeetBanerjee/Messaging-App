
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";
import { Menu,MenuItem,styled } from "@mui/material";

const MenuOption = styled(MenuItem)`
   font-size:14px;
   padding:15px 60px 5px 24px;
   color:#4A4A4A;
`


const HeaderMenu = ({setOpenDrawer}) => {

    const [open,setOpen]= useState(null);

    const handleClose = () =>{
        setOpen(null);
    }

    const handleClick = (e) =>{
        setOpen(e.currentTarget);
    }

    return (

        <>
            <MoreVert onClick={handleClick}/>
            <Menu
                
                anchorEl={open}
                keepMounted //so that menu is always opened down and not anywhere(up,right,left)
                open={open} //if menu open then state will be open otherwise close.to work with this we need state
                onClose={handleClose}
                getContentAnchorE1={null}
                anchorOrigin={{
                    vertical:"bottom",
                    horizontal:"center"
                }}
            >
                <MenuOption onClick={()=>{handleClose();setOpenDrawer(true);}}>Profile</MenuOption> {/*if we have to run 2 or more function with onclick,then we can write the onclick syntax like mentioned here*/}
               
            </Menu>
        </>
    )
}

export default HeaderMenu;