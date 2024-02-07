

import { Search as SearchIcon } from "@mui/icons-material";
import { Box,InputBase,styled } from "@mui/material";


const Component = styled(Box)`
  
    background:#fff;
    height:45px;
    border-bottom :1px solid #F2F2F2;  
    display:flex;
    align-item:center
`;

  const Wrapper = styled(Box)`
    background-color:#f0f2f5;
    position:relative
    margin: 0 13px;
     width:100%;
     border-radius:10px;  
  `;
  const Icon = styled(Box)`
    position:absolute;
    height:100%;
    padding:14px 10px;
    color:#919191;
       
  `;
  const InputField= styled(InputBase)`
    width:100%;
    padding:25px;
    padding-left:64px;
       height:15px;
       font-size:14px;
  `;

  
const Search = ({setText}) =>{

    return(
        <Component>
           <Wrapper>
             <Icon>
                <SearchIcon fontSize="small"/>
              </Icon>
              <InputField placeholder="search or start new chat" onChange={(e) =>setText(e.target.value)}/> {/*this onchange function that we created will help to search a user in leftside chat window..if we search a person name then that person should only come after search..that is done using onchange func that we created ....the e here is event listener..under that there is an inbuild target field from which we can extract value..it is javascript concept not react..for eg if I types A then setText(A) func will call and show will display me all the users whose name has A in it*/}
           </Wrapper>
         </Component>   
    )
}

export default Search;