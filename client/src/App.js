//components
import { GoogleOAuthProvider } from '@react-oauth/google';
import Messenger from "./Components/messenger";
import AccountProvider from './Components/context/AccountProvider';
function App() {

   const clientId = '713902820488-ff82a0ucqe5rsn3t6h4fo8pc9t12dd7v.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>{/*props are arguments passed in react components.here clientID is a prop*/}
      <AccountProvider> {/*wrap the state*/}
     <Messenger/> {/*whole project is in the name of messenger and it acts as a child for accountprovider.anything which is between opening and closing bracket is called children.now whenever we pass children between context we need to pass the word children as forward otherwise blank screen will appear*/}
     </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
