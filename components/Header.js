import Link from 'next/link';
import styled from 'styled-components';

const Head = styled.div`
  position: absolute;
  width: 100%;
  height: 2em;
  background-color: #000;
`;

const Header = () => {
  return <Head />;
};

export default Header;
