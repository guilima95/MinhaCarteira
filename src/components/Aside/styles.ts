import styled from 'styled-components';



export const Container = styled.div`
grid-area: ASIDE;
color: ${props => props.theme.color.white};

background-color: ${props => props.theme.color.secondary};
padding-left: 20px;

border-right: 1px solid  ${props => props.theme.color.gray};
`


export const LogoImg = styled.img`
  width: 50px;
  height: 50px;
  margin-block: 10px;
`

export const Title = styled.h3`
color: ${props => props.theme.color.white};
margin-left: 10px;
align-items: center;
`

export const Header = styled.header`
display: flex;
height: 70px;
align-items: center;

`


export const MenuContainer = styled.nav`
display: flex;
flex-direction: column;

margin-top: 50px;


`


export const MenuItemLink = styled.a`

margin: 7px 0;
color: ${props => props.theme.color.info};
text-decoration: none;
transition: opacity .3s;
display: flex;
align-items: center;

&:hover {
    opacity: .7
}

> svg {
    font-size: 18px;
   margin-right: 5px;

}

`