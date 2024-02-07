import { AppBar, Toolbar, styled, Box } from "@mui/material";
import LoginDialog from "./account/LoginDialog";
import ChatDialog from "./chat/ChatDialog";
import { useContext } from 'react';
import { AccountContext } from "./context/AccountProvider";

const Component = styled(Box)`
  height: 100vh;
  background: #DCDCDC;
`;
const Header = styled(AppBar)`
  height: 125px;
  background-color: #00ABB4;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      {account ? (
        <>
         <Header>
            <Toolbar>
             
            </Toolbar>
          </Header>
        <ChatDialog />  {/*if login in account then chatdialog will run else logindialog will run*/}
        </>
      ) : (
        <>{/*we cannot return multiple components together so we need to wrape it with fragments<>*/}
          <LoginHeader>
            <Toolbar>
             
            </Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
}

export default Messenger;
