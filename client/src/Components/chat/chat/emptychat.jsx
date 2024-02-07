//for right side of whattsapp


import { Box , Typography,styled} from "@mui/material";
import { emptyChatImage } from "../../../Constants/data";

const Component=styled(Box)`
  background:f8f9fa;
  padding:30px 0;
  text-align:center;
  height:100%
`;

const Container=styled(Box)`
 padding:0 200px;
`;

const Image = styled('img')({
    width:400,
    marginTop:50
});

const Title = styled(Typography)`
 font-size:32px;
 margin:25px 0 10px 0;
 font-family:inherit;
 font-weight:300;
 color:#41525d
`;

const SubTitle = styled(Typography)`
 font-size:14px;
 font-family:inherit;
 font-weight:400;
 color:#667781
`;

const Emptychat = () =>{

    return(
        <Component>
            <Container>
               <Image src={emptyChatImage} alt=" phone and laptop"/>
               <Title>Whattsapp Web</Title>
               <SubTitle>Now send and recieve Messages without keeping your phone online</SubTitle>
               <SubTitle>use Whattsapp on upto 4 linked Devices and 1 phone at the same time.</SubTitle>
            </Container>
        </Component>
    )
}

export default Emptychat;