import styled from "styled-components";
import { colors } from "@/styles/colors";

export const DetailsContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
`;

export const DetailsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const BookImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: 2.5rem;
  margin: 0;
`;

export const Author = styled.h2`
  color: ${colors.secondary};
  font-size: 1.5rem;
  margin: 0;
  font-weight: 500;
`;

export const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DetailLabel = styled.span`
  color: ${colors.lightText};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const DetailValue = styled.span`
  color: ${colors.black};
  font-size: 1.1rem;
`;

export const Price = styled.div`
  color: ${colors.primary};
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const BackButton = styled.button`
  background-color: ${colors.lightBg};
  color: ${colors.black};
  border: 1px solid ${colors.lightText};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.lightText};
    color: ${colors.white};
  }
`;

export const BorrowButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.secondary};
  }

  &:disabled {
    background-color: ${colors.lightText};
    cursor: not-allowed;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${colors.lightBg};
`;

export const InfoLabel = styled.span`
  color: ${colors.lightText};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`;

export const InfoValue = styled.span`
  color: ${colors.black};
  font-size: 1.1rem;
`;
