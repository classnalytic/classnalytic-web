import Link from 'next/link';
import styled from 'styled-components';

import Logo from '../assets/logo.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: auto;
  padding: 2em;
  z-index: 999;
`;

const Image = styled.img`
  height: 1.5em;
  cursor: pointer;
`;

const NavBar = () => {
  return (
    <Container>
      <Link href="/">
        <Image src={Logo} />
      </Link>
    </Container>
  );
};

export default NavBar;
