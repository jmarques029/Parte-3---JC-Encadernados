import styled from "styled-components";
import { colors } from "@/styles/colors";

export const MainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: calc(100vh - 200px);
`;

export const Title = styled.h1`
  color: ${colors.primary};
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

export const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const BookCard = styled.div`
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const BookImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

export const BookInfo = styled.div`
  padding: 1rem;
`;

export const BookTitle = styled.h3`
  color: ${colors.black};
  font-size: 1.2rem;
  margin: 0 0 0.5rem 0;
`;

export const BookAuthor = styled.p`
  color: ${colors.lightText};
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
`;

export const BookPrice = styled.p`
  color: ${colors.primary};
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
`;

export const BookOwner = styled.p`
  color: ${colors.lightText};
  font-size: 0.85rem;
  margin: 0.5rem 0 0 0;
  font-style: italic;
`;
