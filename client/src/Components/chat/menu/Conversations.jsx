//this contains the list of user in the menu chat list

import { useEffect,useState,useContext} from "react";
import { Box ,styled,Divider} from "@mui/material";
import { getUsers } from "../../../service/api";
import Conversation from "./Conversation";
import { AccountContext } from "../../context/AccountProvider"; //the detail about the user who is currently logged in is present here


const Component = styled(Box)` //if more no of users came in the menu list then i need a scroll bar so that i can see all users 
   height: 81vh;
   overflow: overlay;
`;

const StyledDivider = styled(Divider)`
 margin: 0 0 0 70px;
 background-color: #e9edef;
 opacity:6;
`;

const Conversations = ({text}) =>{ //here the text comes from the search to find users whom we type in the search bar
    
  const [users,setUsers] = useState([])//an array of object will be returned by the api as users,so I gave an empty array 
  const {account,socket,setActiveUsers} = useContext(AccountContext);

    useEffect(() => {   //useeffect will be used to call the getusers api when the components load along with opening the whattsapp
       const fetchData = async () =>{
          let response = await getUsers();//getusers api is called and it is asynchronous func
          const filteredData = response.filter(user =>user.name.toLowerCase().includes(text.toLowerCase())); //this is for the search bar ..whenever I tyoe a name that name must be searched and shown in left side searchbar 
          setUsers(filteredData);//i need to store this response,so i need to make a state and under that state we will store the api response data.
       }
       fetchData();
    },[text]); //first argument is callback function which defines what i have to do with the useeffect...2nd argument is dependency array which tells when we will call the useeffect...I need to call the useeffect one time only when the components will mount.so i passed an empty array...whenever the text will be changed ,the useeffect func() will call..so text is given in 2nd argument .so whenever we will search by typing user name the useeffect will be called in each search
    
    useEffect(() =>{
      socket.current.emit('addUser',account);//when the user will come online at that time only we are doing addusers in socket.io at backend
      socket.current.on("getUsers",users =>{ //when this getUsers will hit then I will get all users access .we are storing the active users by making a state
         setActiveUsers(users);
      })
    },[account]) //I need to call this useeffect when a new user logins 
    
    return(
        <Component>
            { //looping through the array of object to print users
                users.map(user => (
                     user.sub!==account.sub && //user no should not be equall to the account no I am logged in.This is done so that the account that I have been logged in should not come in chat menu list
                     <>
                     <Conversation user={user}/> {/*this will display the data of a particular user,i passed all user data as prop*/}
                     <StyledDivider/> {/*the line that comes after each user name and image */}
                    </>
              ))
            }
        </Component>
    )
}

export default Conversations;