"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Nav,
  NavLink,
  UserInfo,
  LogoutButton,
} from './styles';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo>
            <h1>JC Encadernados</h1>
          </Logo>
        </Link>
        <Nav>
          {user ? (
            <>
              <UserInfo>Olá, {user.name.value}</UserInfo>
              <Link href="/admin/loans" passHref legacyBehavior>
                <NavLink>Empréstimos</NavLink>
              </Link>
              <LogoutButton onClick={logout}>Sair</LogoutButton>
            </>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <NavLink>Entrar</NavLink>
            </Link>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
