
import { Box } from "@mui/material";
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";
import { useState } from "react";

const Menu = () =>{

   const [text,setText] = useState(''); //this is done for the search system to work..when we type a text in the left chat window search bos,then that person searched should come

    return(
        <Box>
            <Header/>
            <Search setText={setText}/>
            <Conversations text={text}/>
        </Box>
    )
}

export default Menu;