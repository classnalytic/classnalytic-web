import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 2em;
  z-index: 999;
`;

const Title = styled.p`
  margin-bottom: 0 !important;
  margin-right: 1em;
  font-size: 1.2em;
  font-weight: 500;
  color: #000;
  cursor: pointer;
`;

const MenuWrapper = styled.ul`
  display: flex;
  list-style: none;
`;

const Menu = styled.li`
  display: list-item;
  margin-left: 1.5em;
  font-size: 1.2em;
  font-weight: 300;
  color: #000;
  cursor: pointer;
`;

const LogoutButton = Menu.extend`
  color: #f00;
`;

const NavBar = () => {
  return (
    <Container>
      <MenuWrapper>
        <Link href="/">
          <Title>Smart Classroom</Title>
        </Link>
        <Link href="/dashboard">
          <Menu>Dashboard</Menu>
        </Link>
        <Menu>Settings</Menu>
        <LogoutButton>Logout</LogoutButton>
      </MenuWrapper>
    </Container>
  );
};

export default NavBar;
