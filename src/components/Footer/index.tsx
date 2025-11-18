"use client";

import React from 'react';
import { FooterContainer, FooterText } from './styles';

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>© {new Date().getFullYear()} JC Encadernados - Todos os direitos reservados</FooterText>
    </FooterContainer>
  );
};
