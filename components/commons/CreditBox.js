import styled from 'styled-components';

const Box = styled.p`
  width: 100%;
  margin-top: 1em;
  padding: 2em;
  text-align: center;
`;

const Heart = styled.b`
  color: #e8044e;
`;

const CreditBox = () => (
  <Box>
    Made with <Heart>♥</Heart>
  </Box>
);

export default CreditBox;
