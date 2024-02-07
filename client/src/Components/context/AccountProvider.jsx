import { createContext,useState,useRef,useEffect } from "react";

import { io } from 'socket.io-client';


export const AccountContext = createContext(null);//createContext() inbuild func is used to create state ,default parameter is null

const AccountProvider = ({ children }) =>{ //need to pass children otherwise blank screen will appear
   
    const [account,setAccount] = useState(); //usestate is a react hook used to manage state.states are read-only ,here account is the state and to enter value in the state we use setaccount function because account is read-only
    const [person,setPerson] = useState({}); //this person is created for right side chat window header...whenever i click a user a chat window must open with name of the person on top and the online/offline status will be handles by socket.io
    const [activeUsers,setActiveUsers] = useState([]);
    const [newMessengeFlag,setMessengeFlag] =useState(false); //everytime the useeffect needs to be called when I type a message and press enter.to do that we use this

    const socket = useRef();
   useEffect(() =>{
    socket.current =io('ws://localhost:9000');
   },[]) //we have to initialise the socket one time only so we can keep the array dependency empty

    return(
        <AccountContext.Provider value={{//provider inbuild attribute returns value object under which whatever we write we can export it in a context
            account,
            setAccount,
            person,
            setPerson,
            socket,
            activeUsers,
            setActiveUsers,
            newMessengeFlag,
            setMessengeFlag
        }}>
            {children}
    </AccountContext.Provider>
    )
}

export default AccountProvider; //as we have to use this context in the whole project so we have to wrap it in app.js file