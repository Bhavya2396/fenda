import React from 'react';
import styled from 'styled-components';

const LogoImage = styled.img`
  height: 32px;
  width: auto;
  filter: brightness(0) invert(1);
`;

const Logo: React.FC = () => {
  return (
    <LogoImage
      src="/f-d_owler_20160323_100534_original-removebg-preview.png"
      alt="F&D Logo"
    />
  );
};

export default Logo; 