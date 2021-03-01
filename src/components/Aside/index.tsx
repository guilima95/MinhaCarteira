import React from 'react';

import { Container, Header, LogoImg, MenuContainer, MenuItemLink, Title } from './styles';
import logo from '../../assets/logo.svg';

import {
    MdAttachMoney,
    MdDashboard,
    MdExpandLess,
    MdExpandMore,
    MdLoyalty,
    MdMoneyOff,
    MdShoppingCart
} from 'react-icons/md';


const Aside: React.FC = () => {
    return (
        <Container>
            <Header>
                <LogoImg src={logo} alt="Siteware Projeto" />
                <Title>Meu Dinheiro</Title>
            </Header>


            <MenuContainer>
                <MenuItemLink href="/dashboard">
                    <MdDashboard />
                             Dashboard
        </MenuItemLink>
                <MenuItemLink href="/entradas/entry-balance">
                    <MdAttachMoney />
                             Nova Receita
        </MenuItemLink>           <MenuItemLink href="/entradas/exit-balance">
                    <MdMoneyOff />
                             Novo Gasto
        </MenuItemLink>

                <MenuItemLink href="/list/entry-balance">
                    <MdExpandLess />
                             Renda
       </MenuItemLink>

                <MenuItemLink href="/list/exit-balance">
                    <MdExpandMore />
                              Gastos
         </MenuItemLink>
            </MenuContainer>

        </Container>

    )
}

export default Aside;