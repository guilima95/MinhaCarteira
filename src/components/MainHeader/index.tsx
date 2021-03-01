import React from 'react';
import {Container, Profile, UserName, Welcome} from './styles';
import Toggle from '../Toggle';


const MainHeader: React.FC = () => {
    return (
     <Container>
     <Toggle/>
      <Profile>
          <Welcome>Olá, </Welcome>
          <UserName>Guilherme Lima</UserName>
      </Profile>
     </Container>
             
    )
}

export default MainHeader;