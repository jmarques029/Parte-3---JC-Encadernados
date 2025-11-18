"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { makeBookUseCases } from '@/core/factories/makeBookUseCases';
import { makeLoanUseCases } from '@/core/factories/makeLoanUseCases';
import { Book } from '@/core/domain/entities/Book';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import {
  DetailsContainer,
  DetailsContent,
  ImageSection,
  BookImage,
  InfoSection,
  Title,
  Author,
  InfoItem,
  InfoLabel,
  InfoValue,
} from '@/components/MainDetalhes/styles';

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBorrowing, setIsBorrowing] = useState(false);
  const { user } = useAuth();
  const bookUseCases = makeBookUseCases();
  const loanUseCases = makeLoanUseCases();

  useEffect(() => {
    const loadBook = async () => {
      try {
        const bookId = params.id as string;
        const foundBook = await bookUseCases.findBook.execute(bookId);
        setBook(foundBook);
      } catch (error) {
        toast.error('Erro ao carregar livro');
        console.error('Error loading book:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBook();
  }, [params.id]);

  const handleBorrowBook = async () => {
    if (!user) {
      toast.error('Você precisa estar logado para emprestar um livro');
      router.push('/login');
      return;
    }

    if (!book) return;

    setIsBorrowing(true);
    try {
      await loanUseCases.borrowBook.execute({
        userId: user.id,
        bookId: book.id,
      });
      toast.success('Livro emprestado com sucesso!');
      router.push('/admin/loans');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao emprestar livro');
      console.error('Error borrowing book:', error);
    } finally {
      setIsBorrowing(false);
    }
  };

  if (isLoading) {
    return (
      <DetailsContainer>
        <p style={{ textAlign: 'center' }}>Carregando...</p>
      </DetailsContainer>
    );
  }

  if (!book) {
    return (
      <DetailsContainer>
        <p style={{ textAlign: 'center' }}>Livro não encontrado</p>
      </DetailsContainer>
    );
  }

  return (
    <DetailsContainer>
      <DetailsContent>
        <ImageSection>
          <BookImage src={book.photo.url} alt={book.title.value} />
        </ImageSection>
        <InfoSection>
          <Title>{book.title.value}</Title>
          <Author>{book.author.value}</Author>
          
          <InfoItem>
            <InfoLabel>Tipo de Encadernação:</InfoLabel>
            <InfoValue>{book.bindingType.value}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Tipo de Capa:</InfoLabel>
            <InfoValue>{book.coverType.value}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Número de Páginas:</InfoLabel>
            <InfoValue>{book.pages}</InfoValue>
          </InfoItem>

          <InfoItem>
            <InfoLabel>Preço:</InfoLabel>
            <InfoValue>R$ {book.price.toFixed(2)}</InfoValue>
          </InfoItem>

          {book.user && (
            <InfoItem>
              <InfoLabel>Dono:</InfoLabel>
              <InfoValue>{book.user.name.value}</InfoValue>
            </InfoItem>
          )}

          <Button 
            onClick={handleBorrowBook} 
            disabled={isBorrowing}
            style={{ marginTop: '1rem' }}
          >
            {isBorrowing ? 'Emprestando...' : 'Emprestar Livro'}
          </Button>
        </InfoSection>
      </DetailsContent>
    </DetailsContainer>
  );
}
