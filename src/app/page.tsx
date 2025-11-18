"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { Book } from '@/core/domain/entities/Book';
import { BooksGrid, BookCard, BookImage, BookInfo, BookTitle, BookAuthor, BookOwner, MainContainer, Title } from '@/components/MainIndex/styles';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const bookUseCases = makeBookUseCases();
        const allBooks = await bookUseCases.findAllBook.execute();
        setBooks(allBooks);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (isLoading) {
    return (
      <MainContainer>
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Title>Nossos Livros</Title>
      <BooksGrid>
        {books.map((book) => (
          <Link key={book.id} href={`/detalhes/${book.id}`} style={{ textDecoration: 'none' }}>
            <BookCard>
              <BookImage src={book.photo.url} alt={book.title.value} />
              <BookInfo>
                <BookTitle>{book.title.value}</BookTitle>
                <BookAuthor>{book.author.value}</BookAuthor>
                {book.user && <BookOwner>Dono: {book.user.name.value}</BookOwner>}
              </BookInfo>
            </BookCard>
          </Link>
        ))}
      </BooksGrid>
    </MainContainer>
  );
}
