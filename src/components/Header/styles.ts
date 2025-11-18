import styled from "styled-components";
import { colors } from "@/styles/colors";

export const HeaderContainer = styled.header`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 1rem 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
  }

  img {
    height: 40px;
    width: auto;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  color: ${colors.white};
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${colors.secondary};
  }
`;

export const UserInfo = styled.span`
  color: ${colors.white};
  font-size: 1rem;
`;

export const LogoutButton = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.white};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #B8511F;
  }
`;
